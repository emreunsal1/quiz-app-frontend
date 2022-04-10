import React from "react";

export default function Button({ children, color, onclick, disable }) {
  return (
    <button style={{ backgroundColor: color }} onclick={onclick} disabled={disable}>
      {children}
    </button>
  );
}
