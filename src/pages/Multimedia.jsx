function Multimedia() {
  return (
    <main className="container py-4">
      <section aria-labelledby="titulo-multimedia">
        <h1 id="titulo-multimedia">Música para perros</h1>
        <p>Te invitamos a ver un video de música para perros:</p>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube-nocookie.com/embed/DIt8a1Sb68U"
            title="Música para perros con ansiedad"
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}

export default Multimedia;
