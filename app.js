
function generateMeme(e) {
  const imageSrc = imageUrlInput.value;
  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  const image = new Image();
  image.crossOrigin = "anonymous"; 
  image.src = imageSrc;

  image.addEventListener("load", () => {
    const meme = memeTemplate.content.cloneNode(true);
    const memeImage = meme.querySelector(".meme-image");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    // Update canvas background
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    // Prepare text
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;

    // Add top text
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

    // Add bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);

    // Set meme image source
    memeImage.src = canvas.toDataURL();

    // Add delete button to meme
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      memeImage.remove()
      deleteButton.remove()
    });
    meme.appendChild(deleteButton);

    // Add meme to container
    memesContainer.appendChild(meme);
  });

  // Clear form inputs
  imageUrlInput.value = "";
  topTextInput.value = "";
  bottomTextInput.value = "";

}

generateButton.addEventListener("click", generateMeme);
