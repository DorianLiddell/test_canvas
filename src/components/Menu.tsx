import React from "react";
import { Shape } from "../types";

type MenuProps = {
    selectedShapeType: Shape["type"];
    onSelectShapeType: (type: Shape["type"]) => void;
    selectedShape: Shape | undefined;
    onUpdateShape: (id: string, newProperties: Partial<Shape>) => void;
};

export const Menu: React.FC<MenuProps> = ({
    selectedShapeType,
    onSelectShapeType,
    selectedShape,
    onUpdateShape,
}) => {
    
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        if (selectedShape) {
            onUpdateShape(selectedShape.id, { fill: newColor });
        }
    };
    
    return (
        <div style={{ width: "200px", padding: "10px", background: "#e0e0e0", color: "black" }}>
            <h3>Выбрать фигуру</h3>
            <button 
                onClick={() => onSelectShapeType("rectangle")}
                style={{ background: selectedShapeType === "rectangle" ? "blue" : "white",
                        color: "black",    
                        margin: "10px",
                        width: "160px",
                }}
            >
                Прямоугольник
            </button>
            <button 
                onClick={() => onSelectShapeType("circle")}
                style={{ background: selectedShapeType === "circle" ? "red" : "white",
                        color: "black", 
                        margin: "10px",
                        width: "160px",
                }}
            >
                Круг
            </button>
            <button 
                onClick={() => onSelectShapeType("triangle")}
                style={{ background: selectedShapeType === "triangle" ? "green" : "white",
                        color: "black", 
                        margin: "10px",
                        width: "160px",
                }}
            >
                Треугольник
            </button>

            {selectedShape && (
                <>
                    <h3>Свойства</h3>
                    <label>Цвет:</label>
                    <input
                        type="color"
                        value={selectedShape.fill}
                        onChange={handleColorChange}
                    />
                </>
            )}
        </div>
    );
};