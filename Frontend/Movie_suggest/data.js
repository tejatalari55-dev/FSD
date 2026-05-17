const MOVIES_DATA = {
    trending: [
        {
            id: 1,
            title: "RRR",
            overview: "A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in this epic saga set in pre-independent India.",
            backdrop_path: "https://image.tmdb.org/t/p/original/7ZO9yoEU2fAHKhmmRVSPXiqjB1w.jpg",
            poster_path: "https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgHO.jpg"
        },
        {
            id: 2,
            title: "Avengers: Endgame",
            overview: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
            backdrop_path: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            poster_path: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
        },
        {
            id: 3,
            title: "The Batman",
            overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family.",
            backdrop_path: "https://image.tmdb.org/t/p/original/b0PlSFdSmBgENFallCQhoGkKNaH.jpg",
            poster_path: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
        },
        {
            id: 4,
            title: "Dune: Part Two",
            overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
            backdrop_path: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
            poster_path: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGpiZsa5.jpg"
        },
        {
            id: 5,
            title: "Oppenheimer",
            overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb.",
            backdrop_path: "https://image.tmdb.org/t/p/original/fm6Ns0Y70vVJp7GE93pUxbI9Bnu.jpg",
            poster_path: "https://image.tmdb.org/t/p/w500/8Gxv2mYuoqD6P8pZgoYwZpXbdS4.jpg"
        },
        {
            id: 6,
            title: "Spider-Man: Across the Spider-Verse",
            overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
            backdrop_path: "https://image.tmdb.org/t/p/original/4HodYYKEuS4beyspsactiveactive.jpg",
            poster_path: "https://image.tmdb.org/t/p/w500/8Vtpi9pR7S7S38szFbiu9Ip3U6N.jpg"
        }
    ],
    indian: [
        {
            id: 101,
            title: "Dangal",
            overview: "A former wrestler trains his daughters for the Commonwealth Games.",
            poster_path: "https://image.tmdb.org/t/p/w500/pL7jBAdD04nOtawO27a0A2pC6l4.jpg"
        },
        {
            id: 102,
            title: "Baahubali: The Beginning",
            overview: "An adventurous man becomes involved in a decades-old feud between two warring people.",
            poster_path: "https://image.tmdb.org/t/p/w500/91BhiXZbK0R2b2h35P6lYv79uWl.jpg"
        },
        {
            id: 106,
            title: "Jawan",
            overview: "A high-octane action thriller outlining the journey of a man set to rectify society.",
            poster_path: "https://image.tmdb.org/t/p/w500/jILeVcENK9sWz5xK8vO0EksvI7g.jpg"
        },
        {
            id: 107,
            title: "Pathaan",
            overview: "An Indian spy takes on the leader of a group of mercenaries.",
            poster_path: "https://image.tmdb.org/t/p/w500/m1B97mvoSUtZ5mQmslMzp4unYvP.jpg"
        },
        {
            id: 108,
            title: "Pushpa: The Rise",
            overview: "A laborer rises through the ranks of a red sandal smuggling syndicate.",
            poster_path: "https://image.tmdb.org/t/p/w500/890m7rUeb7686Oz789oxp67uzyz.jpg"
        },
        {
            id: 109,
            title: "Leo",
            overview: "A cafe owner becomes a local hero through an act of violence.",
            poster_path: "https://image.tmdb.org/t/p/w500/iS9Y0LpsTp66Zf9mF5iO8C1M8iF.jpg"
        },
        {
            id: 110,
            title: "K.G.F: Chapter 2",
            overview: "Rocky, whose name strikes fear in the heart of his foes, is the new overlord of Kolar Gold Fields.",
            poster_path: "https://image.tmdb.org/t/p/w500/6S636YvY3YptJm9O8Xz2q1s6ZpU.jpg"
        },
        {
            id: 111,
            title: "Salaar: Part 1 - Ceasefire",
            overview: "A gang leader tries to keep a promise made to his dying friend and takes on other criminal gangs.",
            poster_path: "https://image.tmdb.org/t/p/w500/799pS7Y7pSdYvT6j7vX6j7SdY.jpg"
        },
        {
            id: 112,
            title: "Animal",
            overview: "A son's love for his father. Often away on work, the father is unable to comprehend the intensity of his son's love.",
            poster_path: "https://image.tmdb.org/t/p/w500/hr9S9is6SRE6Z_6Z7vX_7SdY.jpg"
        }
    ],
    marvel: [
        {
            id: 201,
            title: "Iron Man",
            overview: "Billionaire Tony Stark creates a unique weaponized suit of armor.",
            poster_path: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
        },
        {
            id: 202,
            title: "Spider-Man: No Way Home",
            overview: "Peter asks Doctor Strange for help when his identity is revealed.",
            poster_path: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vWErW5Nf1w.jpg"
        },
        {
            id: 203,
            title: "Black Panther",
            overview: "T'Challa must step forward to lead his people into a new future.",
            poster_path: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"
        },
        {
            id: 205,
            title: "Thor: Ragnarok",
            overview: "Thor must race against time to return to Asgard and stop Ragnarök.",
            poster_path: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
        },
        {
            id: 207,
            title: "Doctor Strange in the Multiverse of Madness",
            overview: "Doctor Strange teams up with a girl who can travel across multiverses.",
            poster_path: "https://image.tmdb.org/t/p/w500/9GtgmHnkp9uS6p6xa0O6vznXj9y.jpg"
        },
        {
            id: 208,
            title: "Shang-Chi",
            overview: "Shang-Chi must confront his past.",
            poster_path: "https://image.tmdb.org/t/p/w500/1BIoJvI7s7eIqUv6ZrtViEpcnz1.jpg"
        },
        {
            id: 209,
            title: "Guardians of the Galaxy Vol. 3",
            overview: "Peter Quill must rally his team to defend the universe and protect one of their own.",
            poster_path: "https://image.tmdb.org/t/p/w500/r2J0uzC0rU36Z6-6Z7vX_7SdY.jpg"
        }
    ],
    dc: [
        {
            id: 301,
            title: "Man of Steel",
            overview: "An alien child is sent to Earth to live among humans.",
            poster_path: "https://image.tmdb.org/t/p/w500/7rIPWE5lw18A0hP1kF6Eog8bZ9C.jpg"
        },
        {
            id: 302,
            title: "Wonder Woman",
            overview: "Diana leaves home to fight a war.",
            poster_path: "https://image.tmdb.org/t/p/w500/imekS7I1RVepOhmHQ0sAIf2yI6E.jpg"
        },
        {
            id: 303,
            title: "Joker",
            overview: "Mentally troubled comedian Arthur Fleck is disregarded by society.",
            poster_path: "https://image.tmdb.org/t/p/w500/udDclJoHjfPt8M8HmASBsG9oF5V.jpg"
        },
        {
            id: 305,
            title: "Zack Snyder's Justice League",
            overview: "Bruce Wayne aligns forces with Diana Prince.",
            poster_path: "https://image.tmdb.org/t/p/w500/tnAuB8q5vv7Tieqd0jUAW4HQpnH.jpg"
        },
        {
            id: 307,
            title: "Black Adam",
            overview: "Black Adam is freed from his earthly tomb.",
            poster_path: "https://image.tmdb.org/t/p/w500/pIkRyV18p_vF7l5fG7pAs999Y6L.jpg"
        },
        {
            id: 308,
            title: "The Flash",
            overview: "Barry Allen uses his super speed to change the past.",
            poster_path: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjUspuhe.jpg"
        },
        {
            id: 309,
            title: "Aquaman and the Lost Kingdom",
            overview: "Black Manta seeks revenge on Aquaman for his father's death.",
            poster_path: "https://image.tmdb.org/t/p/w500/7sqYUm9Y9Z6-6Z7vX_7SdY.jpg"
        }
    ]
};