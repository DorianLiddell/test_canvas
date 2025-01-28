import React from "react";
import { Shape } from "../types";

type MenuProps = {
    selectedShape: Shape | undefined;
    onAddShape: (type: Shape["type"], x?: number, y?: number) => void;
    onUpdateShape: (id: string, newProperties: Partial<Shape>) => void;
};

export const Menu: React.FC<MenuProps> = ({
    selectedShape,
    onAddShape,
    onUpdateShape,
}) => {
    return (
    <div style={{ width: "200px", padding: "10px", background: "#e0e0e0" }}>
        <h3>Добавить фигуру</h3>
        <button onClick={() => onAddShape("rectangle")}>Прямоугольник</button>
        <button onClick={() => onAddShape("circle")}>Круг</button>
        <button onClick={() => onAddShape("triangle")}>Треугольник</button>

        {selectedShape && (
        <>
            <h3>Свойства</h3>
            <label>Цвет:</label>
            <input
            type="color"
            value={selectedShape.fill}
            onChange={(e) =>
                onUpdateShape(selectedShape.id, { fill: e.target.value })
            }
            />
        </>
        )}
    </div>
    );
};