export default function Button({ children, textOnly, btnClass, ...props }) {
  let cssClass = textOnly ? "text-button" : "button";
  cssClass += " btnClass";

  return (
    <button className={cssClass} {...props}>
      {children}
    </button>
  );
}
