import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect } from "react";

import ImageGallery from "../components/moviePage/ImageGallery";

const MoviePage = () => {
  const { setCurrentTitle, baseName } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    setCurrentTitle("Властелин Колец: Возвращение Короля");
  }, [id, setCurrentTitle]);

  return (
    <section className="section-single-movie">
      <div className="movie-wrapper">
        <div className="left-col">
          <div className="movie-poster-container">
            <img
              src="https://image.tmdb.org/t/p/original/xGeAWst9lwoJj7ldCWerBjAyUNk.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="right-col">
          <div className="data-container">
            <div className="data-item">
              <span className="label">Дата выхода </span>
              <span className="data-info">12 января 2003 года</span>
            </div>
            <div className="data-item">
              <span className="label">Жанр</span>
              <span className="data-info">Приключения, фэнтези, боевик</span>
            </div>
            <div className="data-item">
              <span className="label">Страна</span>
              <span className="data-info">Новая Зеландия, США</span>
            </div>
            <div className="data-item">
              <span className="label">Бюджет</span>
              <span className="data-info">$94 000 000 </span>
            </div>
            <div className="data-item">
              <span className="label">Сборы</span>
              <span className="data-info">$1 118 888 979</span>
            </div>
            <div className="data-item">
              <span className="label">Продолжительность</span>
              <span className="data-info">3 часа 21 минута</span>
            </div>
          </div>
          <div className="description-container">
            <p>
              Последняя часть трилогии о Кольце Всевластия и о героях, взявших
              на себя бремя спасения Средиземья. Повелитель сил Тьмы Саурон
              направляет свои бесчисленные рати под стены Минас-Тирита, крепости
              Последней Надежды. Он предвкушает близкую победу, но именно это и
              мешает ему заметить две крохотные фигурки — хоббитов,
              приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо
              Всевластия. Улыбнется ли им счастье?
            </p>
          </div>

          <ImageGallery />
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
