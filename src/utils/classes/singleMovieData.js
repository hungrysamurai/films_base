export default class SingleMovieData {
  constructor(fetchedData, lang, imagesUrlBase, mediaType) {
    this.fetchedData = fetchedData;
    this.lang = lang;
    this.mediaType = mediaType;

    this.title = this.fetchedData.title
      ? this.fetchedData.title
      : this.fetchedData.name;
    this.poster = fetchedData.poster_path
      ? `${imagesUrlBase}${fetchedData.poster_path}`
      : "/assets/images/no-poster.jpg";
    this.data =
      this.mediaType === "movie" ? this.getMovieData() : this.getTVSeriesData();
    this.description = this.fetchedData.overview;
  }

  getMovieData() {
    return [
      ...(this.fetchedData.release_date
        ? [
            {
              [`${this.lang === "en" ? "Release date" : "Дата выхода"}`]:
                this.getReleaseDate(this.fetchedData.release_date, this.lang),
            },
          ]
        : []),
      ...(this.fetchedData.genres.length > 0
        ? [
            {
              [`${this.lang === "en" ? "Genres" : "Жанр"}`]:
                this.getGenresList(),
            },
          ]
        : []),
      ...(this.fetchedData.production_countries.length > 0
        ? [
            {
              [`${this.lang === "en" ? "Country" : "Страна"}`]:
                this.getCountriesList(),
            },
          ]
        : []),
      ...(this.fetchedData.budget
        ? [
            {
              [`${this.lang === "en" ? "Budget" : "Бюджет"}`]:
                this.getBudgetString(this.fetchedData.budget),
            },
          ]
        : []),
      ...(this.fetchedData.revenue
        ? [
            {
              [`${this.lang === "en" ? "Revenue" : "Сборы"}`]:
                this.getBudgetString(this.fetchedData.revenue),
            },
          ]
        : []),
      ...(this.fetchedData.runtime
        ? [
            {
              [`${this.lang === "en" ? "Runtime" : "Продолжительность"}`]:
                this.getRuntime(this.fetchedData.runtime),
            },
          ]
        : []),
      ...(this.fetchedData.vote_average
        ? [
            {
              [`${this.lang === "en" ? "TMDB Rating" : "Рейтинг TMDB"}`]:
                this.fetchedData.vote_average,
            },
          ]
        : []),
    ];
  }

  getTVSeriesData() {
    return [
      ...(this.fetchedData.first_air_date
        ? [
            {
              [`${this.lang === "en" ? "Release date" : "Дата выхода"}`]:
                this.getReleaseDate(this.fetchedData.first_air_date),
            },
          ]
        : []),
      ...(this.fetchedData.genres.length > 0
        ? [
            {
              [`${this.lang === "en" ? "Genres" : "Жанр"}`]:
                this.getGenresList(),
            },
          ]
        : []),
      ...(this.fetchedData.production_countries.length > 0
        ? [
            {
              [`${this.lang === "en" ? "Country" : "Страна"}`]:
                this.getCountriesList(),
            },
          ]
        : []),
      ...(this.fetchedData.number_of_seasons
        ? [
            {
              [`${this.lang === "en" ? "Total Seasons" : "Всего сезонов"}`]:
                this.fetchedData.number_of_seasons,
            },
          ]
        : []),
      ...(this.fetchedData.number_of_episodes
        ? [
            {
              [`${this.lang === "en" ? "Total episodes" : "Серий"}`]:
                this.fetchedData.number_of_episodes,
            },
          ]
        : []),
      ...(this.fetchedData.vote_average
        ? [
            {
              [`${this.lang === "en" ? "TMDB Rating" : "Рейтинг TMDB"}`]:
                this.fetchedData.vote_average,
            },
          ]
        : []),
    ];
  }

  getCountriesList() {
    return this.fetchedData.production_countries.reduce(
      (string, current, i) => {
        return i === 0
          ? this.getCountryName(current.iso_3166_1, this.lang)
          : `${string}, ${this.getCountryName(current.iso_3166_1, this.lang)}`;
      },
      ""
    );
  }

  getCountryName(iso_string) {
    const countryName = new Intl.DisplayNames([this.lang], { type: "region" });
    return countryName.of(iso_string);
  }

  getReleaseDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDay() + 1;

    let month = this.getMonths(this.lang)[date.getMonth()];
    if (this.lang === "ru") {
      month =
        month[month.length - 1] === "ь"
          ? month.slice(0, -1) + "я"
          : month[month.length - 1] === "й"
          ? month.slice(0, -1) + "я"
          : month + "а";
    }

    const year = date.getFullYear();

    if (this.lang === "en") {
      return `${month} ${day}, ${year}`;
    } else {
      return `${day} ${month} ${year} г.`;
    }
  }

  getMonths() {
    return Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(this.lang, { month: "long" }).format(
        new Date(0, i)
      )
    );
  }

  getGenresList() {
    return this.fetchedData.genres.reduce((string, current, i) => {
      return i === 0
        ? current.name[0].toUpperCase() + current.name.slice(1)
        : `${string}, ${current.name}`;
    }, "");
  }

  getBudgetString(num) {
    const USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return USDollar.format(num);
  }

  getRuntime(mins) {
    const totalHours = Math.floor(mins / 60);
    const appMins = mins % 60;

    let hoursEndString;
    let minutesEndString;

    if (this.lang === "ru") {
      const hoursString = String(totalHours);
      const minsString = String(appMins);

      if (hoursString[hoursString.length - 1] === "1") {
        hoursEndString = "час";
      } else if (
        Number(hoursString[hoursString.length - 1]) > 1 &&
        Number(hoursString[hoursString.length - 1]) < 5
      ) {
        hoursEndString = "часа";
      } else {
        hoursEndString = "часов";
      }

      if (minsString[minsString.length - 1] === "1") {
        minutesEndString = "минута";
      } else if (
        Number(minsString[minsString.length - 1]) > 1 &&
        Number(minsString[minsString.length - 1]) < 5
      ) {
        minutesEndString = "минуты";
      } else {
        minutesEndString = "минут";
      }

      if (
        minsString === "11" ||
        minsString === "12" ||
        minsString === "13" ||
        minsString === "14"
      ) {
        minutesEndString = "минут";
      }

      if (totalHours === 0) {
        return `${minsString} ${minutesEndString}`;
      }

      if (appMins === 0) {
        return `${hoursString} ${hoursEndString}`;
      }

      return `${hoursString} ${hoursEndString} ${minsString} ${minutesEndString}`;
    }

    if (this.lang === "en") {
      if (totalHours === 1) {
        hoursEndString = "hour";
      } else {
        hoursEndString = "hours";
      }

      if (appMins === 1) {
        minutesEndString = "minute";
      } else {
        minutesEndString = "minutes";
      }

      if (totalHours === 0) {
        return `${appMins} ${minutesEndString}`;
      }

      return `${totalHours} ${hoursEndString} ${appMins} ${minutesEndString}`;
    }
  }
}
