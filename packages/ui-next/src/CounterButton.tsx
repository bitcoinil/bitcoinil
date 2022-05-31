import * as React from "react";
import { Button } from "antd";

export interface CounterButtonProps {
  children?: React.ReactNode;
}

export const CounterButton = ({ children }: CounterButtonProps) => {
  const [count, setCount] = React.useState(0);
  return (
    <div
      style={{
        background: `rgba(255,255,255,.05)`,
        borderRadius: `8px`,
        padding: 16,
      }}
    >
      <p>
        <span>{'🧢🍑🍋☠️'.repeat(count + 1)}</span> This is component is from <code>ui-next</code> with{" "}
        <code>antd</code> dependencies!!!
      </p>
      <p>
        <Button type="primary" onClick={() => setCount((c) => c + 1)}>
          count {count}
        </Button>
      </p>
      {children}
    </div>
  );
};
