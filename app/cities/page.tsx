import { useState } from "react";

const cities = [
  "Алма-Ата (Алматы)",
  "Астана",
  "Шымкент",
  "Актобе",
  "Караганда",
  "Тараз",
  "Усть-Каменогорск",
  "Павлодар",
  "Атырау",
  "Семей",
  "Актау",
  "Кызылорда",
  "Костанай",
  "Уральск",
  "Туркестан",
  "Петропавловск",
  "Кокшетау",
  "Темиртау",
  "Талдыкорган",
  "Экибастуз",
  "Рудный",
  "Жезказган",
];

export default function CitiesPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          <span className="text-cyan">ГОРОДА</span>
        </h1>

        <div className="max-w-5xl mx-auto">
          <ul className="list-disc list-inside">
            {cities.map((city, index) => (
              <li key={index} className="text-lg mb-2">
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}