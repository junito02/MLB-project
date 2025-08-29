document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("highlights-container");
  const loader = document.getElementById("highlights-loading");

  const highlights = [
    {
      title: "Kyle Schwarber HR #48",
      desc: "Fly ball a left-center field.",
      url: "https://streamable.com/m/kyle-schwarber-homers-48-on-a-fly-ball-to-left-center-field-harrison-bade?partnerId=web_video-playback-page_video-share",
      type: "iframe",
    },
    {
      title: "Christian Walker - Two Homer Game",
      desc: "Dos home runs en un solo juego.",
      url: "https://streamable.com/m/christian-walker-s-two-homer-game-x6503?partnerId=web_video-playback-page_video-share",
      type: "iframe",
    },
  ];

  highlights.forEach((h) => {
    const card = document.createElement("div");
    card.classList.add("highlight-card");

    let media;
    if (h.type === "video") {
      media = `<div class="video-wrapper">
                 <video controls>
                   <source src="${h.url}" type="video/mp4">
                   Tu navegador no soporta video.
                 </video>
               </div>`;
    } else if (h.type === "iframe") {
      media = `<div class="video-wrapper">
                 <iframe src="${h.url}" frameborder="0" allowfullscreen></iframe>
               </div>`;
    }

    card.innerHTML = `
      ${media}
      <div class="highlight-info">
        <h3>${h.title}</h3>
        <p>${h.desc}</p>
      </div>
    `;

    container.appendChild(card);
  });

  loader.style.display = "none";
});
