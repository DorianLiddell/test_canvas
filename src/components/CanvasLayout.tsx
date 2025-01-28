import React from "react";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";
import { Shape } from "../types";
import { KonvaEventObject } from "konva/lib/Node";

type CanvasProps = {
    scale: number;
    position: { x: number; y: number };
    shapes: Shape[];
    onWheel: (e: KonvaEventObject<WheelEvent>) => void;
    onDragMove: (e: KonvaEventObject<DragEvent>) => void;
    onCanvasClick: (e: KonvaEventObject<MouseEvent>) => void;
    onUpdateShape: (id: string, newProperties: Partial<Shape>) => void;
    onSelectShape: (id: string | null) => void;
    };

export const CanvasLayout: React.FC<CanvasProps> = ({
    scale,
    position,
    shapes,
    onWheel,
    onDragMove,
    onCanvasClick,
    onUpdateShape,
    onSelectShape,
}) => {
    return (
    <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        onWheel={onWheel}
        onDragMove={onDragMove}
        onClick={(e) => {
        if (e.target === e.target.getStage()) {
            onSelectShape(null);
            onCanvasClick(e);
        }
        }}
        style={{ background: "#f0f0f0" }}
    >
        <Layer>
        {shapes.map((shape) => {
            if (shape.type === "rectangle") {
            return (
                <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.fill}
                draggable
                onDragEnd={(e) =>
                    onUpdateShape(shape.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                    })
                }
                onClick={() => onSelectShape(shape.id)}
                />
            );
            } else if (shape.type === "circle") {
            return (
                <Circle
                key={shape.id}
                x={shape.x}
                y={shape.y}
                radius={shape.width / 2}
                fill={shape.fill}
                draggable
                onDragEnd={(e) =>
                    onUpdateShape(shape.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                    })
                }
                onClick={() => onSelectShape(shape.id)}
                />
            );
            } else if (shape.type === "triangle") {
            return (
                <Line
                key={shape.id}
                points={[
                    shape.x,
                    shape.y - shape.height / 2,
                    shape.x - shape.width / 2,
                    shape.y + shape.height / 2,
                    shape.x + shape.width / 2,
                    shape.y + shape.height / 2,
                ]}
                fill={shape.fill}
                closed
                draggable
                onDragEnd={(e) =>
                    onUpdateShape(shape.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                    })
                }
                onClick={() => onSelectShape(shape.id)}
                />
            );
            }
            return null;
        })}
        </Layer>
    </Stage>
    );
};