import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenreApiResponse {
  id: number
  name: string
  slug:string
  url:string
}

const initState = {
  genres: [
      {
        id: 2,
        name: "Point-and-click",
        slug: "point-and-click",
        url: "https://www.igdb.com/genres/point-and-click",
      },
      {
        id: 4,
        name: "Fighting",
        slug: "fighting",

        url: "https://www.igdb.com/genres/fighting",
      },
      {
        id: 5,
        name: "Shooter",
        slug: "shooter",

        url: "https://www.igdb.com/genres/shooter",
      },
      {
        id: 7,
        name: "Music",
        slug: "music",

        url: "https://www.igdb.com/genres/music",
      },
      {
        id: 8,
        name: "Platform",
        slug: "platform",

        url: "https://www.igdb.com/genres/platform",
      },
      {
        id: 9,
        name: "Puzzle",
        slug: "puzzle",

        url: "https://www.igdb.com/genres/puzzle",
      },
      {
        id: 10,
        name: "Racing",
        slug: "racing",

        url: "https://www.igdb.com/genres/racing",
      },
      {
        id: 11,
        name: "Real Time Strategy (RTS)",
        slug: "real-time-strategy-rts",

        url: "https://www.igdb.com/genres/real-time-strategy-rts",
      },
      {
        id: 12,
        name: "Role-playing (RPG)",
        slug: "role-playing-rpg",

        url: "https://www.igdb.com/genres/role-playing-rpg",
      },
      {
        id: 13,
        name: "Simulator",
        slug: "simulator",

        url: "https://www.igdb.com/genres/simulator",
      },
      {
        id: 14,
        name: "Sport",
        slug: "sport",

        url: "https://www.igdb.com/genres/sport",
      },
      {
        id: 15,
        name: "Strategy",
        slug: "strategy",

        url: "https://www.igdb.com/genres/strategy",
      },
      {
        id: 16,
        name: "Turn-based strategy (TBS)",
        slug: "turn-based-strategy-tbs",

        url: "https://www.igdb.com/genres/turn-based-strategy-tbs",
      },
      {
        id: 24,
        name: "Tactical",
        slug: "tactical",

        url: "https://www.igdb.com/genres/tactical",
      },
      {
        id: 25,
        name: "Hack and slash/Beat 'em up",
        slug: "hack-and-slash-beat-em-up",

        url: "https://www.igdb.com/genres/hack-and-slash-beat-em-up",
      },
      {
        id: 26,
        name: "Quiz/Trivia",
        slug: "quiz-trivia",

        url: "https://www.igdb.com/genres/quiz-trivia",
      },
      {
        id: 30,
        name: "Pinball",
        slug: "pinball",

        url: "https://www.igdb.com/genres/pinball",
      },
      {
        id: 31,
        name: "Adventure",
        slug: "adventure",

        url: "https://www.igdb.com/genres/adventure",
      },
      {
        id: 32,
        name: "Indie",
        slug: "indie",

        url: "https://www.igdb.com/genres/indie",
      },
      {
        id: 33,
        name: "Arcade",
        slug: "arcade",

        url: "https://www.igdb.com/genres/arcade",
      },
      {
        id: 34,
        name: "Visual Novel",
        slug: "visual-novel",

        url: "https://www.igdb.com/genres/visual-novel",
      },
      {
        id: 35,
        name: "Card & Board Game",
        slug: "card-and-board-game",

        url: "https://www.igdb.com/genres/card-and-board-game",
      },
      {
        id: 36,
        name: "MOBA",
        slug: "moba",
        url: "https://www.igdb.com/genres/moba",
      },
  ] as GenreApiResponse[] ,
};

export const genreSlice = createSlice({
  name: "genreSlice",
  initialState: initState,
  reducers: {
    addGenre: (state, action: PayloadAction<GenreApiResponse>) => {
      state.genres.push(action.payload);
    },
  },
});

export const { addGenre } = genreSlice.actions;
