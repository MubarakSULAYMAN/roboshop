# Robot Market

This is an e-commerce site for you to buy robots. The homepage should display a list of robots for people to browse,
where on the right side of the screen should display a cart that show a list of selected robots. (Adopted from [robot-market])

## Features

- A thumbnail view of products.
- The shop and cart sections displays side y side.
- With the ability to only allow a user shop 5 types of toys at  a time.
- Price is displayed in Thai Baht formatted, `฿5,300.00`, as indicated
- User can sort by material type, name and price.
- User can filter by a robot's material type.

## Robots API

**__DO NOT CHANGE API RESPONSE INSIDE SERVER FOLDER__**

- The basic query looks like this: `/api/robots`
- The response format is JSON

```json
{
  name
  image
  price
  stock
  createdAt
  material
}
```

(Adopted from [robot-market])

## FAQs

### How do I start the app?

Start both server and frontend project by using `npm start` command. The port for frontend is `localhost:3000`, and for server is `localhost:8000`

### Built with

[Vue 3](https://v3.vuejs.org/guide/) + [typescript](https://www.typescriptlang.org/) + [composition api](https://v3.vuejs.org/guide/composition-api-introduction.html)

## Acknowledgments

- Inspiration was drawn from [robot-market] by morphosisteam on [bitbucket](https://bitbucket.org). Server was cloned from [robot-market bitbucket](https://bitbucket.org/morphosisteam/robot-market.git).

[robot-market]: (https://bitbucket.org/morphosisteam/robot-market#readme)
