import React,{useState,useEffect} from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import propTypes  from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
  // document.title = `${props.category} - NewsMonkey`

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  // articles = [
  //   {
  //     source: {
  //       id: null,
  //       name: "Yahoo Entertainment",
  //     },
  //     author: null,
  //     title:
  //       "Asia shares nudge higher, dollar eases as ECB comments lift risk appetite - Yahoo Finance",
  //     description:
  //       "NEW YORK/LONDON (Reuters) -A global equities gauge fell slightly on Tuesday while U.S. Treasury yields rose to multi-week peaks as investors waited cautiously for inflation data due later in the week with hopes for clues on the outlook for U.S. interest rates.",
  //     url: "https://finance.yahoo.com/news/asia-shares-drift-rally-wall-024613283.html",
  //     urlToImage:
  //       "https://s.yimg.com/ny/api/res/1.2/Bv3QhdXurQi1N1LXrEztIw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/reuters-finance.com/0dc6818d25726013fa767f20248a8e58",
  //     publishedAt: "2024-05-28T06:18:00Z",
  //     content:
  //       "If you click 'Accept all', we and our partners, including 237 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]",
  //   },
  //   {
  //     source: {
  //       id: "associated-press",
  //       name: "Associated Press",
  //     },
  //     author: "ROD McGUIRK",
  //     title:
  //       "PNG landslide: Villagers dig with bare hands for remains of missing relatives - The Associated Press",
  //     description:
  //       "Authorities fear a second landslide and a disease outbreak are looming at the scene of Papua New Guinea’s mass-casualty disaster. U.N. official Serhan Aktoprak said Tuesday the mass of debris that devastated Yambali village in the South Pacific nation’s remot…",
  //     url: "https://apnews.com/article/papua-new-guinea-landslide-79e867795f8293aab3f35da58b0d1d47",
  //     urlToImage:
  //       "https://dims.apnews.com/dims4/default/4144e4b/2147483647/strip/true/crop/5611x3156+0+292/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fcb%2F47%2F1119fa9b2a95a273c23361e2c64a%2Fa63e5aeb50354ab988d2d2c7f06f85e6",
  //     publishedAt: "2024-05-28T04:58:00Z",
  //     content:
  //       "MELBOURNE, Australia (AP) Authorities fear a second landslide and a disease outbreak are looming at the scene of Papua New Guineas mass-casualty disaster because of water streams and bodies trapped b… [+4394 chars]",
  //   },
  //   {
  //     source: {
  //       id: "reuters",
  //       name: "Reuters",
  //     },
  //     author: "Reuters",
  //     title: "Elon Musk's xAI valued at $24 bln after fresh funding - Reuters",
  //     description:
  //       "Elon Musk's AI startup xAI raised $6 billion in series B funding, reaching a post-money valuation of $24 billion as investors bet big on challengers to companies like OpenAI in the intensifying AI race.",
  //     url: "https://www.reuters.com/technology/elon-musks-xai-raises-6-bln-series-b-funding-round-2024-05-27/",
  //     urlToImage:
  //       "https://www.reuters.com/resizer/v2/HZAA27WWRBMDLPQQYSP5J5DRKE.jpg?auth=4fc232352bd6eea627c79655b7cbcadadb491b9c29687e258d1d3e7d2479f5bd&height=1005&width=1920&quality=80&smart=true",
  //     publishedAt: "2024-05-28T04:58:00Z",
  //     content: null,
  //   },
  //   {
  //     source: {
  //       id: "the-washington-post",
  //       name: "The Washington Post",
  //     },
  //     author: "Daniel Wu",
  //     title:
  //       "Va. firm fined for discriminatory hiring ad that only sought White citizens - The Washington Post",
  //     description:
  //       "Arthur Grand Technologies, an IT firm based in Ashburn, Va., will pay more than $38,000 in penalties for a job ad that sought only White U.S. citizens.",
  //     url: "https://www.washingtonpost.com/dc-md-va/2024/05/27/employment-discrimination-arthur-grand/",
  //     urlToImage:
  //       "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/BHOOSAEHZMJRN25SMM2TSRL3YQ_size-normalized.jpg&w=1440",
  //     publishedAt: "2024-05-28T04:17:00Z",
  //     content:
  //       "A Virginia-based technology company will pay more than $38,000 in penaltiesfor posting a discriminatory job advertisement that only sought to hire White U.S. citizens, the Justice Department announce… [+478 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Rolling Stone",
  //     },
  //     author: "Angie Martoccio",
  //     title:
  //       "Grateful Dead Honor Bill Walton: 'Biggest Deadhead in the World' - Rolling Stone",
  //     description:
  //       'Grateful Dead\'s Bob Weir, Mickey Hart, and Bill Kreutzmann say fare thee well to NBA great Bill Walton, "the biggest Deadhead in the world."',
  //     url: "http://www.rollingstone.com/music/music-news/bill-walton-grateful-dead-tribute-hart-weir-kreutzmann-1235028311/",
  //     urlToImage:
  //       "https://www.rollingstone.com/wp-content/uploads/2024/05/GettyImages-503068518.jpeg?w=1600&h=900&crop=1",
  //     publishedAt: "2024-05-28T04:08:41Z",
  //     content:
  //       "The surviving members of the Grateful Dead paid tribute to Bill Walton, the NBA Hall of Famer and beloved Deadhead who died on Monday from cancer at 71.\r\nThe band’s offshoot Dead &amp; Company posted… [+1998 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Variety",
  //     },
  //     author: "Michaela Zee",
  //     title:
  //       "‘Fallen Idols’ Doc Dives Into Nick Carter Rape Allegations and Aaron Carter Controversies: Biggest Revelations - Variety",
  //     description:
  //       "'Fallen Idols' delves into the accusations and controversies surrounding Nick and Aaron Carter. Here are the five biggest revelations.",
  //     url: "https://variety.com/2024/tv/news/fallen-idols-nick-carter-aaron-carter-docuseries-revelations-1236017048/",
  //     urlToImage:
  //       "https://variety.com/wp-content/uploads/2024/04/GettyImages-71421940-e1713930990977.jpg?w=1000&h=563&crop=1",
  //     publishedAt: "2024-05-28T03:39:00Z",
  //     content:
  //       "“Fallen Idols” delves into the accusations and controversies surrounding Backstreet Boys member Nick Carter and late pop singer Aaron Carter. \r\nThe Investigation Discovery docuseries introduces three… [+8292 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "BBC News",
  //     },
  //     author: null,
  //     title:
  //       "Israel Gaza: Netanyahu vows to continue war amid air strike condemnation - BBC.com",
  //     description:
  //       "At least 45 people were killed in a strike on Rafah, according to the Hamas-run health ministry.",
  //     url: "https://www.bbc.com/news/article/c7228x974lxo",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/88b1/live/59ae0d00-1c8d-11ef-9b0c-01ed3af5d50e.jpg",
  //     publishedAt: "2024-05-28T03:21:47Z",
  //     content:
  //       "Israeli Prime Minister Benjamin Netanyahu has vowed to continue the war against Hamas amid international condemnation of an air strike that killed scores of Palestinians in Rafah on Sunday.\r\nAt least… [+4702 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "YouTube",
  //     },
  //     author: null,
  //     title:
  //       "Final 5:36 WILD ENDING #1 Celtics vs #6 Pacers | Game 4 | May 27, 2025 - NBA",
  //     description:
  //       "You can watch a live stream of ESPN, ESPN2 and ESPN3 (this channel simulcasts any games that are on ABC) via Sling TV's “Sling Orange” channel bundle. It doesn't come with a free trial, but you can get your first month for only $15",
  //     url: "https://www.youtube.com/watch?v=irR5Sv40EjI",
  //     urlToImage:
  //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAz1BMVEX///8dQorIEC7EABYNPIjL0uAAM4PsrbcAN4b7/P4YP4j2+PsNOYZme6nJ0eOMncHGACPl6fHGACEAMIHa3+s2VZXIACjttL3zzdP99fft8PbFAB388PLut8CaqcfT2eatudP55egALYHacH7YX3DDAAD12N2lss1cdKfMGjnWT2Tjj5vQPFHxyM7vwMfAyt5EXpkpS5BQZ53mnKfSRlrjkJvWWmvEAA1xhrN8j7i1wdg3WJffe4qHmb7LFjXYZ3UAI33OMUnihJLmo6zKKT8kBg5zAAANV0lEQVR4nO2dC1PiPBfHCWSxDZU7lQpydQGvUK8oKqvy/T/Tk/SaNr0677uc7PCfnUXbhvE3SXOSk5OTQuGggw466KCDDjrooIP+VTXaQ6Zfv6q/LFWtz6rzc8V6ZnbT5TWbjY09/9UZpbbniw4iOEaasliq1oPjt4+ezqt4cXk1g085fDExJoSgaBE8OHUfNW4/m8WA9PrF9maff326Tt8RjoOzhEf847NdvRhSvbgd7+mPz6L2QkvkQ9pLsMDtdTOMWOxdw63G4UpL5EPEHIaKjK91AVG/ONvLn5+u9iYFEOFFJVzoTACkiB8wa7FylwaIlBeh1PhBrMSifg3yXawpaYCoNRBKqedCZ8PexfM9AKRpaCZ3MkyTkVBM3UYRFuu3f58gTYv0KkSTpVAsug6L9af+HhgSdZpiJ5jIn3BXWij0o95D9ip29wCRqEE5HdBcNYRy3YtIwGJvugeIJKnr1I4UlZciYOFbNPl2He7+PkSiGqvURkpQRDkjwuI7lQjMYLTTe9JIwrNSDGCxBOxFzGAriKKK5U56sYTA7MUQZbCGEa9h4SKulcIjTFdZHNEUxpHW0CIENvzOQkjQq1DuLb6VSkiIyqNwsThrKCshroZKGZexjbRYOtkLSKwyEaLQoG38Fg8IjzC9K0Vk0w6UMZ5ijaGshHengTK3MQM2eQlDM3zjOqGNSkhIiPYn2NHcJ1ahVIQEY4TMziJoDW8/EgGLpaM9ocQompBo5bKCkTl4XVbbATeberuLG65JRIhxZ1GbL4fthjjknn2kAMpAqK0GEWiObp7lJ1SOo6YSrvpXH8kdDXxC7UVwbwc1+7pItofACZXFaVoR4+YyCRE4IV6lAlIZ24RhG3RCcSYYpe5nPCJswvJ7xmL9q2KsFwMyIUFZ2qitk7hqBE2ozXOU7G+jaxEyIb7LXoVUxn0pihEa4S+OcJKtm/F1Lxkh3uQtbFxFeNwAE2qj3KWNB3EyDJcw7KvIpBuZ6lCJ8GynypgKlQiWkJCkKUWsbsU6BObF8Ai1xY/Ki+uI4Aix20jFYIRM+gp3p1AJSedHjZQ20/DgDSqhVvvhF4zDrjeghAS105+NlBGOOgFKqKx/+gWCvYBJSLAYEpRVV00ZCLV1rPswVeHAGpiEKLwEmkNHMhBqi59XYeFEhvewnLcK+zP/5zMJ+lJ8l+IEDqv7tPW3V0hBmG9uP542ezs/ilQCQhIRW5mgMzbr1f3wPAkIo0Ke4nXfY0RcaNcteEKi5KnCmR3P1nv0r+yAExLtOM/zb7b1az55V9RLHTYh1vL0M4bjzNc//WvTHmxCbZOnkR49OxwfflfzXYJNWM4zqzC8LQjcvooucMJJnrUKPySx+e1d7AN/DyMDgOPkO2XqX95F41MHTRgVph4rP5ZG5/bGBHfPgCM0czx89uxx6Du/q3lsgiac5PDlTzmUur/p4Ax2HU6yj9kCo5feffR1eITl48yz34C/ounvNFTPm5AJtU5WP6K65UH0C//OTQkyIcZZDaIaDH7ucfN8fhkRHiEx14MRVbono/vEj0C5FzEwR4RHSOf4GlXrLv3hPr8JgbeIfW5+AZHQDhbKMom64TeS6NzWkaNn8ITaXaYOJ2ARr/3rBvg6xBl7VG5UUyw+c7vUfHSYhCSr09vghy/1J9+neOPdgLbvyVm3eMlq9oMbnvwkEWNvggGTEGde4j7iDUb90rtueAkIQBISM/P66Cyw5Mvt+f1qQibEd5nHpv0nfrrb3Ho37nuQCfOsAAdD2S68SjwBTdjK4au5DRA239zrXdCttJVjdc0oBuVO9fugrQXO440K2ouS55H6rMMlJGae9cP7wASjd+52Ul/PTbCEeJWHcOZ3pvXi9NZzSPWPttaqDUhCMc9VgvzENL1tKAWGlcYNJmGuQAXHtuv6lZBO6OiiB5MwVyt1nIe6HkXSv6pDJMzX0xTGdhO9j7xpXP4GSIjK+cL2mL1oPsbcPAFJmGdMQ7VtFvXPuJRe/QeIM+B8C90ntC/txVfULUTCHLOngtXT6A/xWdlUYHminBlwri1dO70Z3c2AlEOYK+7rslmEmeMyUm6McJ6AjPvSDlhLTJJDqGXweHualR7+b3/P/16uRzi7L4q9iJfpD4GRR5i+S92TsX1KfwiMvHULLUclPsrYShHuZJ9gnH3Cz0/uySPM0512JexLUa59zv1PYCOzJPmEeYKhH97Sn4EinnCVudS0GN9M+8AyQ3KEaJJ5a9Dj76/4e9+xt/YinlDJmhWjcPb8EZeHdbaDtg+YI8wetD8r1S+j26lx/hswISJZvftjvVg/j7Kf6lcP3F7uAGFnXXvN8jIaF3qxF3GeRX/ahLdbnSe0zmDJsiHY2sGtP8xCl2cs0hQ2IVOWwG/jiflM6/obd7yMOvvS2VX4hOJpHaJUJ7ik/jk9mlnv4+zszYlVgE+ItON0l4YbFqzXm/rF9fXnTm96kQrwCVGGPSaBUFN2IBK3oigBIemkjsHD27kkI0RKavqB8HYu2QjTg8CMy9hKlIIQaau0Cf9V/MkBUhCm77ocx6ZOlISQmL9SCk7jECUhRDjNRRyRIUouQpS602Qac3aANISpg7fus+SEtD9NGbzFHAAhDyEqp9j9WXTea4kICUkZn35H2kSJCBFJ2QRtRJ41IxMhnUclD22+o95EqQgRTjYZUQdZSkZIUPKa21fEwEYuwrQ4lKizPCQjTFkb7ouA0hGmxPFHHIIoHSHSagkdasTgVD5CpCT43k5Eoy8hIW2osYgzsauRkRApsQvgY3FsKiUhbagxiH3RIyUnIdJialF9E5qppISxJ3uIhz/JSkhNf+REI5w1UWJC2t1EIXb/jb7UqcWoDe1jwb0vMSHSopyowrhNZkKEO6Jf4zzc1UhNiEh5EB7eCAsYchMiQsIjOGFkKjkh7VJXwZU3YWQqPSHC5oj/gn7Y4SY/ISI4cPZc2FfzDxBSs7EZ+bPicehY0n+CkFYjt+30Rv8HCRHho8KD7RQwIUsXha3t+VhjO0s163eM3VNM6GX7vtVQOasRdAzDJcQvA6p3iramn5isBpZqa1Ozas2sOfftSiTc8uJ9SQpCxbJzpyZhEe0VxVuzqFQXDNHZDt02nSrlA4rHPYkIC3dWYmGOkFJ3iBft1lg5hIRPmslnMAVPuFZwmLAwVyjhu/X76cJNDsYfZS0V4bzFTidzCBvrF7Y0w5omO/CqqhbUteYQcjOpQH4s8ITVMkfYnliORNY02dU5bajvDiFvLgJBC+AJG0gZ+YRl65SkU0pIaGW+U9qB4tQhF3DzKE9fWmE05ZFAeIcRCz5Z059HZfd531wE0n7CJqT/1DXLfx0mJNbngkItXULsLWf0A54MmDn3XEI2oB6IhPQ9JNQcVu5oS20r3hDBfROBZ9kNEA4ozmsrihAvWAMe0f/8UZx75mUwxA04Ia2kqjbwCRWXUFvTjw5LTGB6JyZORvZ33MLOWB4gnFO4hlkTCDeEnYXcNlloxkbYkykT4Ygtad+9c/awzCjadvqTIWFj0YXmlnCD+rsX8hC+svSCxy+qS1gZvTI/d01DLdZ+MTva60XxCe1TIUOzJ9CES9YmB8dqcFy6bNlJepbWeveg7BGiluXnV5/q8hCyWd9yUQkRThDBtLG+Wk32VeEI7ZwoU9AZy4OE7Fjnhk9YWVZZZ/KuWamk5mW2BXPI+T2cAM172BnLg4TMUixOOXu4pohDOgplYwGFNeI28g9JbtkTjJtniQjZO/jS8AmxbS2UY7uPaTOrKBAaH5AzlhOesNra0CngoCGMaZg5VI//sN3edJDqd6aOP4o/5RE4YdnqUSIIWZcyXC7p3cox9yJqdnhml8u9Cy0j3TBIqExouxuKhNx8V33xTb67B4wfmYIjDM6eFNb/N0RCzC041TShDvkoTHCEoTpkoYhqRSBk81/1V7XKLPycM4iKbRD5+RM4QhQkxPZAzCVsaTah9T8yCXOwvXJ16MwR/Wze8Ag9D69D6Jxe7RKiTq3CphvW+HtCFMbvd05+eiluY0IJWOYPOjEKEiLLxLljmuGQmYOhRVZt2elPGoiT836OudMfwrv09yy/77cJnRlR0CO8mFits2U7uiv+HNjfHOUtIurFvw+RrJoSJFSs3lFVuGyRI6XFjMKcEhL2+8on9PacPLpLF01wmc5o23M6/tdGg3Yi+LjdaDTaGl40LLWXC0zKg9PGKZsYavQm8y26r6GXjbDrJRcGNqQp+F4J0tl0rCHnZtPZbBAy6a+djmkSbN/bsMZJ6M0O19Es3G9xT3/QP+ElyRq5nT+hcj+J+2lfQuIPdsv2AvndUNqY5Lt7VYVzvORV2VtEdCyivotPbLo/tc2freVTtbwtii4hMHPv6JVvePkIvZ1f9rkXvbj8yfvWHP8Q0d9magXt997AZhscmT97F/2e5rvHkrSDBSwUlqvWT6qRrNz49l2993EEGJD2qIOVouWHxHYzNaa/d1/wDGFQanuw0CaTFlM5s1rlOR2+9ref991cpw/sSeppdc5ihPKJTorHM9Dt86CDDjrooIMOOmiP+g+T/zVXMv7FtgAAAABJRU5ErkJggg==",
  //     publishedAt: "2024-05-28T03:02:47Z",
  //     content:
  //       "Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\nRemind me later",
  //   },
  //   {
  //     source: {
  //       id: "abc-news",
  //       name: "ABC News",
  //     },
  //     author:
  //       "HYUNG-JIN KIM Associated Press, KIM TONG-HYUNG Associated Press, MARI YAMAGUCHI Associated Press",
  //     title:
  //       "North Korean rocket carrying its 2nd spy satellite explodes shortly after launch - ABC News",
  //     description:
  //       "The rocket blew up soon after liftoff due to a suspected engine problem.",
  //     url: "https://abcnews.go.com/International/wireStory/north-korea-appears-fired-missile-sea-japan-south-110586068",
  //     urlToImage:
  //       "https://i.abcnewsfe.com/a/f80d26ae-09f2-447e-b2ba-7ec720e707f0/wirestory_28efd0f15318594fdcf5ec8f416c196b_16x9.jpg?w=1600",
  //     publishedAt: "2024-05-28T03:00:00Z",
  //     content:
  //       "SEOUL, South Korea -- A rocket launched by North Korea to deploy the countrys second spy satellite exploded shortly after liftoff Monday, state media reported, in a setback for leader Kim Jong Uns ho… [+5048 chars]",
  //   },
  //   {
  //     source: {
  //       id: "cnn",
  //       name: "CNN",
  //     },
  //     author: "Ashley Williams, Elisa Raffa, Mary Gilbert",
  //     title:
  //       "Severe storms threaten millions across the East on Memorial Day following a weekend of destructive, deadly weather - CNN",
  //     description:
  //       "The threat of severe weather expands to millions in the East on Memorial Day after intense and deadly storms ravaged a large area of the central United States over the weekend.",
  //     url: "https://www.cnn.com/2024/05/27/weather/memorial-day-weekend-forecast-monday/index.html",
  //     urlToImage:
  //       "https://media.cnn.com/api/v1/images/stellar/prod/cnn-digital-tracker-severe-outlook-day-1-052724.png?c=16x9&q=w_800,c_fill",
  //     publishedAt: "2024-05-28T02:48:00Z",
  //     content:
  //       "Millions in the East are in the path of severe weather on Memorial Day after intense and deadly storms ravaged a large area of the central United States over the weekend.\r\nDestructive thunderstorms a… [+5366 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Deadline",
  //     },
  //     author: "Armando Tinoco",
  //     title:
  //       "‘General Hospital’ Alum Johnny Wactor Has GoFundMe Set Up By Godmother To Support Actor’s Family After Fatal Shooting - Deadline",
  //     description:
  //       "Johnny Wactor, the former General Hospital actor who was fatally shot on Saturday, has been set up with a GoFundMe to help support his loved ones.",
  //     url: "http://deadline.com/2024/05/general-hospital-johnny-wactor-gofundme-fatal-shooting-1235942166/",
  //     urlToImage:
  //       "https://deadline.com/wp-content/uploads/2024/05/johnny-wactor-general-hospital-gofundme.jpg?w=1024",
  //     publishedAt: "2024-05-28T02:32:00Z",
  //     content:
  //       "Johnny Wactor, the former General Hospital actor who was fatally shot on Saturday, has been set up with a GoFundMe to help support his loved ones.\r\nWactor’s mother, Scarlett Wactor, endorsed the crow… [+1622 chars]",
  //   },
  //   {
  //     source: {
  //       id: "cnn",
  //       name: "CNN",
  //     },
  //     author: "Radina Gigova, Ivana Kottasová",
  //     title:
  //       "Russian strike kills 18 people in Kharkiv megastore, the deadliest attack Ukraine has seen in weeks - CNN",
  //     description:
  //       "Eighteen people, including a 12-year-old girl, were killed in a Russian strike that hit a large store in Kharkiv on Saturday, regional officials have said, making it the deadliest attack Ukraine has endured in several weeks.",
  //     url: "https://www.cnn.com/2024/05/27/europe/russian-strike-kharkiv-megastore-intl/index.html",
  //     urlToImage:
  //       "https://media.cnn.com/api/v1/images/stellar/prod/01-gettyimages-2154175029.JPG?c=16x9&q=w_800,c_fill",
  //     publishedAt: "2024-05-28T02:31:00Z",
  //     content:
  //       "Eighteen people, including a 12-year-old girl, are among those killed in a Russian strike that hit a large store in Kharkiv at the weekend, regional officials have said, making it the deadliest attac… [+5870 chars]",
  //   },
  //   {
  //     source: {
  //       id: "cbs-news",
  //       name: "CBS News",
  //     },
  //     author: null,
  //     title:
  //       "Trump responds to special counsel's effort to limit his remarks about FBI in documents case - CBS News",
  //     description:
  //       'Trump falsely claimed last week that FBI agents who searched Mar-a-Lago in August 2022 were "authorized to shoot me."',
  //     url: "https://www.cbsnews.com/news/trump-responds-special-counsel-limit-fbi-remarks/",
  //     urlToImage:
  //       "https://assets1.cbsnewsstatic.com/hub/i/r/2024/05/28/1470e57c-0089-4b34-a860-8ca52f0c8d4f/thumbnail/1200x630g2/46c5cd12e1db2fcc35bf70acb1b00b1b/gettyimages-2154801919.jpg?v=83093a0dd27502f0a52cd68b1c5b8b6e",
  //     publishedAt: "2024-05-28T02:09:08Z",
  //     content:
  //       "Attorneys for former President Donald Trump on Monday evening pushed back against special counsel Jack Smith's request Friday that a federal judge in Florida modify Trump's conditions of release in t… [+4185 chars]",
  //   },
  //   {
  //     source: {
  //       id: "al-jazeera-english",
  //       name: "Al Jazeera English",
  //     },
  //     author: "Al Jazeera",
  //     title:
  //       "UK’s Sunak pledges tax cuts for pensioners as Tories face election wipeout - Al Jazeera English",
  //     description:
  //       "Opposition Labour Party slams election pledge as latest ‘desperate move’ by governing party.",
  //     url: "https://www.aljazeera.com/economy/2024/5/28/uks-sunak-pledges-tax-cuts-for-pensioners-as-tories-face-election-wipeout",
  //     urlToImage:
  //       "https://www.aljazeera.com/wp-content/uploads/2024/05/AP24143387297109-1716393368_59ed99-1716859978.jpg?resize=1200%2C630&quality=80",
  //     publishedAt: "2024-05-28T01:58:58Z",
  //     content:
  //       "United Kingdom Prime Minister Rishi Sunak has pledged to cut taxes for millions of pensioners as he seeks to turn around his Conservative Partys dismal poll numbers ahead of general elections in July… [+2164 chars]",
  //   },
  //   {
  //     source: {
  //       id: "usa-today",
  //       name: "USA Today",
  //     },
  //     author: "Bob Nightengale",
  //     title:
  //       "Ángel Hernández to retire: Much-maligned MLB umpire calling it quits - USA TODAY",
  //     description:
  //       "MLB players and fans alike were always been vocal about Ángel Hernández being one of baseball's worst umpires.",
  //     url: "https://www.usatoday.com/story/sports/mlb/columnist/bob-nightengale/2024/05/27/angel-hernandez-retires-mlb-umpire-stats/73873676007/",
  //     urlToImage:
  //       "https://www.usatoday.com/gcdn/authoring/authoring-images/2024/05/28/USAT/73873822007-usatsi-23164899.jpg?crop=3410,1918,x989,y39&width=3200&height=1800&format=pjpg&auto=webp",
  //     publishedAt: "2024-05-28T01:08:26Z",
  //     content:
  //       "Angel Hernandez, the polarizing veteran umpire who has drawn the wrath and exasperation from players, managers and fans alike over three decades, is retiring Tuesday from Major League Baseball, accor… [+3767 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Hollywood Reporter",
  //     },
  //     author: "Carly Thomas",
  //     title:
  //       "Josh O’Connor and Cailee Spaeny Join ‘Wake Up Dead Man: A Knives Out Mystery’ - Hollywood Reporter",
  //     description:
  //       "The actors are teaming up with Daniel Craig on director Rian Johnson's next ensemble murder mystery.",
  //     url: "http://www.hollywoodreporter.com/movies/movie-news/josh-oconnor-cailee-spaeny-knives-out-3-1235909771/",
  //     urlToImage:
  //       "https://www.hollywoodreporter.com/wp-content/uploads/2024/05/Josh-OConnor-Cailee-Spaeny-getty-H-2024.jpg?w=1024",
  //     publishedAt: "2024-05-28T01:07:30Z",
  //     content:
  //       "Josh O’Connor and Cailee Spaeny are joining Daniel Craig in the upcoming Knives Out 3 sequel, The Hollywood Reporter has confirmed.\r\nLast week, writer and director Rian Johnson confirmed on X, former… [+1722 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bloomberg",
  //       name: "Bloomberg",
  //     },
  //     author: "Greg Ritchie",
  //     title:
  //       "Wall Street Returns to T+1 Stock Trading After a Century - Bloomberg",
  //     description:
  //       "The US stock market is finally as fast as it was about a hundred years ago.",
  //     url: "https://www.bloomberg.com/news/article/2024-05-28/wall-street-returns-to-t-1-stock-trading-after-a-century",
  //     urlToImage:
  //       "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ir9CWroJ3WMo/v0/1200x800.jpg",
  //     publishedAt: "2024-05-28T00:00:00Z",
  //     content:
  //       "The US stock market is finally as fast as it was about a hundred years ago.\r\nThat was the last time share trades in New York settled in a single day, as they will from Tuesday under new Securities an… [+166 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "FOX 4 News",
  //     },
  //     author: "FOX 4 Staff",
  //     title:
  //       "Dallas weather: Cars camp out under overpass to avoid hail - FOX 4 News Dallas-Fort Worth",
  //     description:
  //       "DON'T DO THIS! Traffic came to a complete stand-still on 35E in Dallas on Monday evening as cars tried to avoid getting hit by hail.",
  //     url: "https://www.fox4news.com/weather/dallas-weather-cars-camp-out-under-overpass-avoid-hail",
  //     urlToImage:
  //       "https://images.foxtv.com/static.fox4news.com/www.fox4news.com/content/uploads/2024/05/1280/720/dallas-overpass.jpg?ve=1&tl=1",
  //     publishedAt: "2024-05-27T23:58:04Z",
  //     content:
  //       "DALLAS - Traffic came to a complete stand-still on 35E in Dallas on Monday evening as cars tried to avoid getting hit by hail.\r\nFOX 4 photographer Richie Roberson was in one of the cars forced to sto… [+490 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "New York Post",
  //     },
  //     author: "Jack Morphet, Megan Palin",
  //     title:
  //       "Jared Ravizza claimed to be a model, attacked dad in April: report - New York Post ",
  //     description:
  //       "Jared Ravizza, 26, bragged during interviews about his prowess as a pro skier, model, philanthropist and the leader of Ravizza Group, a marketing company which he founded.",
  //     url: "https://nypost.com/2024/05/27/us-news/jared-ravizza-claimed-to-be-a-model-attacked-dad-in-april-report/",
  //     urlToImage:
  //       "https://nypost.com/wp-content/uploads/sites/2/2024/05/boston-theater-stabbing-suspect-history-comp-01.jpg?quality=75&strip=all&w=1024",
  //     publishedAt: "2024-05-27T23:08:00Z",
  //     content:
  //       "The man suspected of a stabbing spree which injured six, including three children, in Massachusetts claimed to be a male model and a CEO.\r\nJared Ravizza, 26, bragged during interviews about his prowe… [+5151 chars]",
  //   },
  //   {
  //     source: {
  //       id: "cbs-news",
  //       name: "CBS News",
  //     },
  //     author: "Dave Savini, Samah Assad",
  //     title:
  //       "Veterans who served at secret base say it made them sick, but they can't get aid because the government won't acknowledge they were there - CBS News",
  //     description:
  //       "For decades, the U.S. government conducted nuclear bomb tests near what is sometimes called Area 52.",
  //     url: "https://www.cbsnews.com/news/area-52-cancer-secret-air-force-base/",
  //     urlToImage:
  //       "https://assets2.cbsnewsstatic.com/hub/i/r/2024/05/27/46de55b9-e9a0-4c45-9572-8bdd6e3bfce9/thumbnail/1200x630/33e14a2935c9b71f8c069e6d9cf80310/en-area-52.jpg?v=83093a0dd27502f0a52cd68b1c5b8b6e",
  //     publishedAt: "2024-05-27T22:52:00Z",
  //     content:
  //       "In the mid-1980s, Air Force technician Mark Ely's job was to inspect secretly obtained Soviet fighter jets. \r\nThe work, carried out in hidden hangers known as hush houses, was part of a classified mi… [+2264 chars]",
  //   },
  // ];

  

 const Updatenews= async()=>{
    props.setprogress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=225eb7c6cbee4b2f8c47998931cded76&page=${page}&pageSize=${props.pageSizes}`;
    setLoading(true)
    props.setprogress(25)
    let data = await fetch(url);
    props.setprogress(50)
    let parsedata = await data.json();
    console.log(parsedata);
    props.setprogress(75)
    setArticles(parsedata.articles)
    setLoading(false)
    setTotalResults(parsedata.totalResults)
   
    props.setprogress(100)

  }

 useEffect(()=>{
  Updatenews();
 },[])
  

  // const handlePrevClick = async () => {
   
  //   setPage(page-1)
  //   Updatenews();
  // };

  // const handleNextClick = async () => {
   
  //  setPage(page+1)
  //   Updatenews();

  // };

  const fetchMoreData = async() => {
    
    let url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=225eb7c6cbee4b2f8c47998931cded76&page=${page+1}&pageSize=${props.pageSizes}`;
    setPage(page+1)
   
    let data = await fetch(url);
    let parsedata = await data.json(); 
    console.log(articles);
    setArticles(articles.concat(parsedata.articles))
    setTotalResults( parsedata.totalResults)
   
  }


    return (
     <>
  <div>
  <h1 className="text-center mb-5" style={{
    marginTop: '90px'
  }} > NewsMonkey - Top {props.category}  Headlines</h1>{" "}
  {/* {loading && <Spinner />}{" "} */}
  <InfiniteScroll
    dataLength={articles ? articles.length : 0}
    next={fetchMoreData}
    hasMore={articles ? articles.length < totalResults : false}
    loader={<Spinner/>}
  >
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="row">
        { articles && articles.length > 0 && articles.map((article) => {
          return (
            <div className="col-lg-3 col-md-6 mb-4" key={article.url} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '24rem'}}>
                <NewsItem
                  title={article.title ? article.title.slice(0, 45) : ""}
                  description={article.description ? article.description.slice(0, 88) : ""}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </InfiniteScroll>
</div>
      
     </>
    );
  }


News.defaultProps = {
  country : 'in',
  pageSizes: 8,
  category:'general'
}
 News.propTypes = {
  country : propTypes.string,
  pageSizes: propTypes.number,
  category:propTypes.string
}


export default News;
