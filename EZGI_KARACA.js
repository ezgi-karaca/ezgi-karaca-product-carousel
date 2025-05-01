

if (window.location.pathname !== "/") {
  console.log("wrong page");
} else {
console.log("my codes are working")

const responsiveStyle = document.createElement("style");
responsiveStyle.innerHTML = `
  .product-card {
    width: 273px;
  }

  @media (max-width: 1024px) {
    .product-card {
      width: 48%;
    }
  }

  @media (max-width: 600px) {
    .product-card {
      width: 48%;
    }
  }

  @media (max-width: 400px) {
    .product-card {
      width: 100%;
    }
  }
`;
document.head.appendChild(responsiveStyle);



let products = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const getProducts = async () => {
  const savedProducts = localStorage.getItem("productList");  

  if(savedProducts) {
    products = JSON.parse(savedProducts);
    console.log("Product data fetched from localStorage.");

    createCarouselContainer();
    renderProducts(products);
  } else {

    try {
      const response = await fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json", {method: "GET"});

      products = await response.json();

      localStorage.setItem("productList", JSON.stringify(products));
      console.log("Data is fetched and saved in localStorage: ", products);

      createCarouselContainer();
      renderProducts(products);

    } catch (error) {
      console.log("Error receiving data: ", error);
    }
    
  }
}

const createCarouselContainer = () => {
  const section1Slot = document.querySelector('cx-page-slot[position="Section1"]');

  if(!section1Slot){
    console.log("Section1 not found");
    return;
  }

  const carouselContainer = document.createElement("div");
  carouselContainer.id = "carousel-container";
  carouselContainer.style.paddingRight = "15px";
  carouselContainer.style.paddingLeft = "15px";
  carouselContainer.style.margin = "40px auto";
  carouselContainer.style.width = "100%";
  carouselContainer.style.maxWidth = "1200px";
  carouselContainer.style.display = "block";
  carouselContainer.style.backgroundColor = "#fff";
  carouselContainer.style.borderRadius = "24px";
  carouselContainer.style.fontFamily = "Quicksand, sans-serif";
  carouselContainer.style.position = "relative";
  carouselContainer.style.boxSizing = "border-box";


  const carouselTitle = document.createElement("h2");
  carouselTitle.textContent = "Beğenebileceğinizi Düşündüklerimiz";
  carouselTitle.style.margin = "0 0 16px";
  carouselTitle.style.padding = "24px 60px";
  carouselTitle.style.backgroundColor = "#fef6eb";
  carouselTitle.style.color = "#f28e00";
  carouselTitle.style.fontSize = "26px";
  carouselTitle.style.fontWeight = "700";
  carouselTitle.style.fontFamily = "Quicksand-Bold";
  carouselTitle.style.borderRadius = "35px 35px 0 0";

  carouselContainer.appendChild(carouselTitle);

  const carouselContent = document.createElement("div");
  carouselContent.id = "carousel-products";
  carouselContent.style.display = "flex";
  carouselContent.style.gap = "20px";
  carouselContent.style.overflowX = "auto";
  carouselContent.style.scrollSnapType = "x mandatory";
  carouselContent.style.scrollBehavior = "smooth";
  carouselContent.style.boxSizing = "border-box";
  carouselContent.style.margin = "0";

  carouselContainer.appendChild(carouselContent);

  const scrollArea = carouselContent;

  const leftScroll = document.createElement("img");
  leftScroll.src = "https://www.e-bebek.com/assets/svg/prev.svg";
  leftScroll.alt = "Back";
  leftScroll.style.backgroundPosition = "18px";
  leftScroll.style.position = "absolute";
  leftScroll.style.top = "auto";
  leftScroll.style.left = "-50px";
  leftScroll.style.width = "50px";
  leftScroll.style.height = "50px";
  leftScroll.style.backgroundColor = "#fef6eb";
  leftScroll.style.borderRadius = "50%";
  leftScroll.style.cursor = "pointer";
  leftScroll.style.bottom = "50%";
  leftScroll.style.border = "1px solid #0000";
  leftScroll.style.boxSizing = "border-box";
  leftScroll.style.padding = "15px";

  const rightScroll = document.createElement("img");
  rightScroll.src = "https://www.e-bebek.com/assets/svg/next.svg";
  rightScroll.alt = "Next";
  rightScroll.style.backgroundPosition = "18px";
  rightScroll.style.position = "absolute";
  rightScroll.style.top = "auto";
  rightScroll.style.right = "-50px";
  rightScroll.style.width = "50px";
  rightScroll.style.height = "50px";
  rightScroll.style.backgroundColor = "#fef6eb";
  rightScroll.style.borderRadius = "50%";
  rightScroll.style.cursor = "pointer";
  rightScroll.style.bottom = "50%";
  rightScroll.style.border = "1px solid #0000";
  rightScroll.style.boxSizing = "border-box";
  rightScroll.style.padding = "15px";

  leftScroll.addEventListener("click", () => {
    scrollArea.scrollBy({ left: -300, behavior: "smooth" });
  });
  
  rightScroll.addEventListener("click", () => {
    scrollArea.scrollBy({ left: 300, behavior: "smooth" });
  });
  

  carouselContainer.appendChild(leftScroll);
  carouselContainer.appendChild(rightScroll);

  section1Slot.parentNode.insertBefore(carouselContainer, section1Slot.nextSibling);  

  

};

const renderProducts = (products) => {
  const container = document.getElementById("carousel-products");
  container.innerHTML = "";

  products.forEach((product) => {

    const card = document.createElement("div");
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    card.style.fontSize = "12px";
    card.style.fontFamily = "Poppins, cursive";
    card.style.boxSizing = "border-box";
    card.style.border = "1px solid #f0f0f0";
    card.style.borderRadius = "12px";
    card.style.padding = "20px";
    card.style.minHeight = "580px";
    card.style.backgroundColor = "#fff";
    card.style.flexShrink = "0";
    card.style.position = "relative";
    card.style.gap = "12px";
    card.style.color = "#7d7d7d";


    card.style.position = "relative";
    card.classList.add("product-card");


    card.addEventListener("mouseenter", () => {
      card.style.outline = "3px solid #f28e00";
      card.style.outlineOffset = "-3px";
      card.style.transition = "outline 0.2s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.outline = "none";
    });


    const heartWrapper = document.createElement("div");
    heartWrapper.style.position = "absolute";
    heartWrapper.style.top = "8px";
    heartWrapper.style.right = "12px";
    heartWrapper.style.width = "50px";
    heartWrapper.style.height = "50px";
    heartWrapper.style.padding = "12.5px";
    heartWrapper.style.boxSizing = "border-box";
    heartWrapper.style.borderRadius = "50%";
    heartWrapper.style.backgroundColor = "#fff";
    heartWrapper.style.boxShadow = "0 2px 4px 0 #00000024";
    heartWrapper.style.display = "flex";
    heartWrapper.style.alignItems = "center";
    heartWrapper.style.justifyContent = "center";
    heartWrapper.style.cursor = "pointer";
    

    const heartSymbol = document.createElement("img");

    const defaultFavorite = "https://www.e-bebek.com/assets/svg/default-favorite.svg";
    const addedFavorite = "https://www.e-bebek.com/assets/svg/added-favorite.svg";
    heartSymbol.src = favorites.includes(product.id) ? addedFavorite : defaultFavorite;
    heartSymbol.style.objectFit = "contain";
    heartSymbol.style.borderRadius = "0";


    heartSymbol.addEventListener("click", () => {
      if(favorites.includes(product.id)) {
        favorites = favorites.filter(id => id !== product.id);
        heartSymbol.src = defaultFavorite;
      } else {
        favorites.push(product.id);
        heartSymbol.src = addedFavorite;
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    })

    heartWrapper.appendChild(heartSymbol);
    card.appendChild(heartWrapper);

    const link = document.createElement("a");
    link.href = product.url;
    link.target = "_blank";


    const image = document.createElement("img");
    image.src = product.img;
    image.alt = product.name;
    image.style.display = "block";
    image.style.width = "100%";
    image.style.maxHeight = "100%";
    

    link.appendChild(image);
    card.appendChild(link);

    const title = document.createElement("div");
    title.style.fontSize = "11px";
    title.style.marginTop = "40px";
    title.style.marginBottom = "10px";
    title.style.height = "42px";
    title.style.fontWeight = "500";

    title.innerHTML = `<strong>${product.brand} - </strong>  ${product.name}`;
    card.appendChild(title);

    //Since there is no data about rating in the given link, I randomized it just for the sake of appearence. Hope you don't mind. Below are the mentioned codes.

    const randomReviewCount = Math.floor(Math.random() * 500) + 1;
    const randomStarRating  = Math.floor(Math.random() * 3) + 3;
    
    const ratingSection = document.createElement("div");
    ratingSection.style.display = "flex";
    ratingSection.style.alignItems = "center";
    ratingSection.style.marginBottom = "20px";
    
    for (let i = 1; i <= 5; i++) {
      const starIcon = document.createElement("cx-icon");
      starIcon.classList.add("star", "cx-icon", "fa-star", i <= randomStarRating ? "fas" : "far");
      starIcon.style.fontSize = "14px";
      starIcon.style.color = i <= randomStarRating ? "#fed100" : "#E0E0E0";
      ratingSection.appendChild(starIcon);
    }
    
    const reviewCountText = document.createElement("span");
    reviewCountText.textContent = `(${randomReviewCount})`;
    reviewCountText.style.fontSize = "12px";
    reviewCountText.style.color = "#7d7d7d";
    
    ratingSection.appendChild(reviewCountText);
    card.appendChild(ratingSection);
    


    const priceSection = document.createElement("div");
    priceSection.style.width = "100%";
    priceSection.style.height = "60px";
    priceSection.style.boxSizing = "border-box";
    priceSection.style.display = "flex";
    priceSection.style.flexDirection = "column";
    priceSection.style.justifyContent = "space-between";
    
    const isDiscounted = product.original_price && product.original_price > product.price;
    if (isDiscounted) {
      const discountRow = document.createElement("div");
      discountRow.style.display = "flex";
      discountRow.style.alignItems = "center";
      discountRow.style.gap = "6px";
    
      const originalPriceText = document.createElement("span");
      originalPriceText.textContent = product.original_price.toFixed(2) + " TL";
      originalPriceText.style.fontSize = "14px";
      originalPriceText.style.fontWeight = "500";
      originalPriceText.style.color = "#7d7d7d";
      originalPriceText.style.textDecoration = "line-through";
      originalPriceText.style.margin = "0";
    
      discountRow.appendChild(originalPriceText);
    
      const discountPercentage = Math.round(100 - (product.price / product.original_price) * 100);
      const discountBadge = document.createElement("span");
      discountBadge.textContent = `%${discountPercentage}`;
      discountBadge.style.display = "inline-flex";
      discountBadge.style.justifyContent = "center";
      discountBadge.style.alignItems = "center";
      discountBadge.style.textAlign = "center";
      discountBadge.style.fontSize = "18px";
      discountBadge.style.color = "#00a365";
      discountBadge.style.fontWeight = "700";
      discountBadge.style.margin = "0";
    
      discountRow.appendChild(discountBadge);
    
      const discountIcon = document.createElement("i");
      discountIcon.classList.add("icon", "icon-decrease");
      discountIcon.style.fontSize = "22px";
      discountIcon.style.color = "#00A365";
      discountIcon.style.display = "inline-flex";
      discountIcon.style.alignItems = "center";
    
      discountRow.appendChild(discountIcon);
      priceSection.appendChild(discountRow);
    }
    
    const currentPriceText = document.createElement("div");
    currentPriceText.textContent = product.price.toFixed(2) + " TL";
    currentPriceText.style.display = "block";
    currentPriceText.style.width = "100%";
    currentPriceText.style.fontSize = "21px";
    currentPriceText.style.fontWeight = "600";
    currentPriceText.style.color = isDiscounted ? "#00A365" : "#7d7d7d";
    
    priceSection.appendChild(currentPriceText);
    card.appendChild(priceSection);    

    const campaign = document.createElement("div");
    campaign.textContent = "Farklı Ürünlerde 3 Al 2 Öde";
    campaign.style.backgroundColor = "#e5f8f3";
    campaign.style.width = "80%";
    campaign.style.color = "#00a365";
    campaign.style.borderRadius = "25px";
    campaign.style.fontSize = "12px";
    campaign.style.fontWeight = "600";
    campaign.style.padding = "8px 12px";
    campaign.style.display = "inline-block";
    campaign.style.marginTop = "-20px";
    campaign.style.marginLeft = "-5px";
    campaign.style.marginBottom = "10px";

    card.appendChild(campaign);

    const addToCard = document.createElement("button");
    addToCard.textContent = "Sepete Ekle";
    addToCard.style.position = "relative";
    addToCard.style.width = "100%";
    addToCard.style.padding = "15px 20px";
    addToCard.style.backgroundColor = "#fff7ec";
    addToCard.style.color = "#f28e00";
    addToCard.style.border = "1px solid #0000";
    addToCard.style.borderRadius = "37.5px";
    addToCard.style.fontWeight = "700";
    addToCard.style.fontSize = "12px";
    addToCard.style.cursor = "pointer";
    addToCard.style.marginTop = "19px";
    

    addToCard.addEventListener("mouseenter", ()=> {
      addToCard.style.backgroundColor = "#f28e00";
      addToCard.style.color = "#fff";
    })

    addToCard.addEventListener("mouseleave", () => {
      addToCard.style.backgroundColor = "#fff3e0";
      addToCard.style.color = "#f28e00";
    })

    card.appendChild(addToCard);

    container.appendChild(card);

  })
}

getProducts();
  
}

