import React from "react";

export default function Typography({ children, color }) {
  return <div className={color}>{children}</div>;
}
