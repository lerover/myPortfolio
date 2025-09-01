const data = [
    {
        img: "images/gallery/newImages/zeekwekposLanding.png",
    },
    {
        img: "images/gallery/newImages/pos.png",
    },
    {
        img: "images/gallery/newImages/laundryHome.png",
    },
    {
        img: "images/gallery/newImages/laundry.png",
    }
]

const galleryItems = document.getElementById("gallery-items");


data.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("gallery-items__item", "grid-cols__column")
    div.innerHTML = `
                        <a href="${d.img}" class="gallery-items__item-thumb glightbox">
                            <img src="${d.img}" style="object-fit: cover;" alt="">                                
                        </a>
                    `
    
    galleryItems.appendChild(div);

    console.log(d)
})