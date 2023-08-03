(function () {
	function openModal(img) {
	  if (modal) {
		modal.style.display = "block";
		modalImg.src = img.src;
		captionText.innerHTML = img.alt;
	  }
	}
  
	const images = document.querySelectorAll('img');
	images.forEach(function (img) {
	  img.addEventListener('click', function () {
		openModal(this);
	  });
	});
  
	function closeModal() {
	  if (modal) {
		modal.style.display = "none";
	  }
	}
  
	const modal = document.getElementById('myModal');
	const modalImg = modal ? document.getElementById("img01") : null;
	const captionText = modal ? document.getElementById("caption") : null;
  
	const span = document.getElementsByClassName("close")[0];
	const screen = document.getElementsByClassName("modal")[0];
  
	if (span) {
	  span.onclick = closeModal;
	}
  
	if (screen) {
	  screen.onclick = closeModal;
	}
  
	function loadImage(img) {
	  return new Promise((resolve) => {
		if (img.complete) {
		  resolve();
		} else {
		  img.addEventListener('load', resolve);
		}
	  });
	}
  
	async function handleImageAspectRatio(figureElement) {
	  const imgElement = figureElement.querySelector('img');
	  await loadImage(imgElement);
  
	  const image = new Image();
	  image.src = imgElement.src;
  
	  if (image.height > image.width) {
		figureElement.classList.add('half-width');
	  }
	}
  
	document.addEventListener("DOMContentLoaded", function () {
	  const figureElements = document.querySelectorAll('figure');
	  figureElements.forEach(function (figureElement) {
		handleImageAspectRatio(figureElement);
	  });
	});
  })();
  