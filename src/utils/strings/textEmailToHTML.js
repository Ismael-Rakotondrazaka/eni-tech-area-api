const textEmailToHTML = (text, options = { style: "", className: "" }) => {
  return text
    .split("\n")
    .map(
      (val) =>
        `<p style="${options?.style}" class="${options?.className}">${val}</p>`
    )
    .join("");
};

export { textEmailToHTML };
