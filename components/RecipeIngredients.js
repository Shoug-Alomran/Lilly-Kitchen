"use client";

import { useMemo, useState } from "react";

function parseLeadingQuantity(item) {
  const spacedMatch = item.match(/^(\d+(?:\.\d+)?|\d+\/\d+)\s+(.+)$/);

  if (spacedMatch) {
    return {
      quantity: spacedMatch[1],
      rest: spacedMatch[2]
    };
  }

  const attachedMatch = item.match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)\s+(.+)$/);

  if (attachedMatch) {
    return {
      quantity: attachedMatch[1],
      rest: `${attachedMatch[2]} ${attachedMatch[3]}`
    };
  }

  return null;
}

function parseNumericValue(value) {
  if (value.includes("/")) {
    const [numerator, denominator] = value.split("/").map(Number);
    return numerator / denominator;
  }

  return Number(value);
}

function formatQuantity(value) {
  const rounded = Math.round(value * 4) / 4;

  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  const fractionMap = {
    0.25: "1/4",
    0.5: "1/2",
    0.75: "3/4"
  };

  const whole = Math.floor(rounded);
  const fraction = Number((rounded - whole).toFixed(2));

  if (whole > 0 && fractionMap[fraction]) {
    return `${whole} ${fractionMap[fraction]}`;
  }

  if (fractionMap[rounded]) {
    return fractionMap[rounded];
  }

  return rounded.toFixed(2).replace(/\.00$/, "");
}

function scaleIngredient(item, baseServings, targetServings) {
  const parsed = parseLeadingQuantity(item);

  if (!parsed) {
    return item;
  }

  const scaledValue = (parseNumericValue(parsed.quantity) / baseServings) * targetServings;
  return `${formatQuantity(scaledValue)} ${parsed.rest}`;
}

export default function RecipeIngredients({ ingredients, baseServings }) {
  const [servings, setServings] = useState(baseServings);
  const [checkedItems, setCheckedItems] = useState({});
  const scaledIngredients = useMemo(() => {
    return Object.fromEntries(
      Object.entries(ingredients).map(([group, items]) => [
        group,
        items.map((item) => scaleIngredient(item, baseServings, servings))
      ])
    );
  }, [ingredients, baseServings, servings]);

  function handleCheck(item) {
    setCheckedItems((current) => ({
      ...current,
      [item]: !current[item]
    }));
  }

  async function handleCopy() {
    const lines = Object.entries(scaledIngredients).flatMap(([group, items]) => [
      group,
      ...items.map((item) => `- ${item}`),
      ""
    ]);

    await navigator.clipboard.writeText(lines.join("\n").trim());
  }

  return (
    <aside className="ingredients-sidebar">
      <div className="ingr-title">Ingredients</div>
      <div className="servings-adjuster">
        <button type="button" className="adj-btn" onClick={() => setServings((value) => Math.max(1, value - 1))}>
          −
        </button>
        <div>
          <div className="adj-num">{servings}</div>
          <div className="adj-label">servings</div>
        </div>
        <button type="button" className="adj-btn" onClick={() => setServings((value) => value + 1)}>
          +
        </button>
      </div>

      {Object.entries(scaledIngredients).map(([group, items]) => (
        <div key={group}>
          <div className="ingr-group-title">{group}</div>
          {items.map((item, index) => {
            const key = `${group}-${index}`;

            return (
              <label key={key} className={`ingr-item ${checkedItems[key] ? "is-checked" : ""}`}>
                <input type="checkbox" checked={Boolean(checkedItems[key])} onChange={() => handleCheck(key)} />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      ))}

      <button type="button" className="copy-link" onClick={handleCopy}>
        📋 Copy ingredients list
      </button>
    </aside>
  );
}
