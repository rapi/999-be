import axios from 'axios';
jest.setTimeout(1000000);
describe('ItemController', () => {
  it('should be defined', () => {
    const data = await fetch('http://localhost:3000/api/page?categoryId=1189', {
      method: 'GET',
    }).then((e) => e.json());
    const users = [...new Set(data.map((e) => e.userId))];
    const userMap = Object.fromEntries(
      users.map((user) => [user, data.find((item) => item.userId === user)]),
    );
    const ads = [];
    for (const i in users) {
      const rating = await fetch(
        'http://localhost:3000/api/review?id=' + users[i],
        { method: 'GET' },
      ).then((e) => e.json());
      //await new Promise(resolve=>setTimeout(resolve,1000));
      console.log(i, users.length);
      if (rating.count)
        ads.push({
          userMarkCount: rating.count,
          userMark: rating.rate,
          link: userMap[users[i]].link,
        });
    }
    console.log(ads);
    Object.values(ads)
      .sort((a, b) => b.userMarkCount - a.userMarkCount)
      .forEach((e, i) => console.log(i, e.link, e.userMark));
  });
});
