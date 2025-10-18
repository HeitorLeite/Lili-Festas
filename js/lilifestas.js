document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image-wrapper");

  images.forEach((image, index) => {
    setTimeout(() => {
      image.classList.add("animate");
    }, 200 * index);
  });

  const galleryData = {
    stitch: {
      title: "Stitch",
      images: [
        "img/Album_Stitch/1.jpg",
        "img/Album_Stitch/2.jpg",
        "img/Album_Stitch/3.jpg",
        "img/Album_Stitch/4.jpg",
        "img/Album_Stitch/5.jpg",
        "img/Album_Stitch/6.jpg",
        "img/Album_Stitch/7.jpg",
        "img/Album_Stitch/8.jpg",
        "img/Album_Stitch/9.jpg",
        "img/Album_Stitch/10.jpg",
      ],
    },
    frutinhas: {
      title: "Frutinhas",
      images: [
        "img/Album_Frutinhas/1.jpg",
        "img/Album_Frutinhas/2.jpg",
        "img/Album_Frutinhas/3.jpg",
        "img/Album_Frutinhas/4.jpg",
        "img/Album_Frutinhas/5.jpg",
        "img/Album_Frutinhas/6.jpg",
        "img/Album_Frutinhas/7.jpg",
        "img/Album_Frutinhas/8.jpg",
        "img/Album_Frutinhas/9.jpg",
        "img/Album_Frutinhas/10.jpg",
      ],
    },
    sonic: {
      title: "Sonic",
      images: [
        "img/Album_Sonic/1.jpg",
        "img/Album_Sonic/2.jpg",
        "img/Album_Sonic/3.jpg",
        "img/Album_Sonic/4.jpg",
      ],
    },
    videogame: {
      title: "Video Game",
      images: [
        "img/Album_VídeoGame/1.jpg",
        "img/Album_VídeoGame/2.jpg",
        "img/Album_VídeoGame/3.jpg",
        "img/Album_VídeoGame/4.jpg",
        "img/Album_VídeoGame/5.jpg",
        "img/Album_VídeoGame/6.jpg",
        "img/Album_VídeoGame/7.jpg",
        "img/Album_VídeoGame/8.jpg",
        "img/Album_VídeoGame/9.jpg",
        "img/Album_VídeoGame/10.jpg",
      ],
    },
    fazendinhamickey: {
      title: "Fazendinha do Mickey",
      images: [
        "img/Album_FazendoMickey/1.jpg",
        "img/Album_FazendoMickey/2.jpg",
        "img/Album_FazendoMickey/3.jpg",
        "img/Album_FazendoMickey/4.jpg",
        "img/Album_FazendoMickey/5.jpg",
      ],
    },
  };

  const modal = document.getElementById("gallery-modal");
  const modalCloseButton = modal.querySelector(".modal-close");
  const modalTitle = modal.querySelector("#modal-title");
  const modalGrid = modal.querySelector("#modal-grid");
  const portfolioButtons = document.querySelectorAll(
    ".portfolio-card .card-button"
  );

  async function openModal(albumKey) {
    const album = galleryData[albumKey];

    if (!album) {
      console.error("Álbum não encontrado:", albumKey);
      return;
    }

    modalGrid.innerHTML =
      '<p style="text-align: center; color: var(--dark-text);">Carregando fotos...</p>';

    modalTitle.textContent = album.title;

    modal.classList.add("active");

    const imagePromises = album.images.map((imagePath) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
          const orientation =
            img.naturalWidth > img.naturalHeight ? "horizontal" : "vertical";
          resolve({
            src: imagePath,
            orientation: orientation,
          });
        };

        img.onerror = () => {
          console.warn("Erro ao carregar imagem:", imagePath);
          resolve(null);
        };
      });
    });

    const loadedImages = await Promise.all(imagePromises);

    const sortedImages = loadedImages
      .filter((img) => img !== null)
      .sort((a, b) => {
        // Lógica de ordenação:
        // Se A for horizontal e B for vertical, A vem primeiro (-1)
        // Se A for vertical e B for horizontal, B vem primeiro (1)
        // Se ambas forem iguais, mantém a ordem (0)
        if (a.orientation === "horizontal" && b.orientation === "vertical") {
          return -1;
        }
        if (a.orientation === "vertical" && b.orientation === "horizontal") {
          return 1;
        }
        return 0;
      });

    modalGrid.innerHTML = "";

    sortedImages.forEach((imageData) => {
      const img = document.createElement("img");
      img.src = imageData.src;
      img.alt = `Foto do álbum ${album.title}`;
      modalGrid.appendChild(img);
    });
  }

  function closeModal() {
    modal.classList.remove("active");
  }

  portfolioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".portfolio-card");
      const albumKey = card.dataset.album;
      openModal(albumKey);
    });
  });

  modalCloseButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
