import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import "./../css/category.css";

function showStars(stars) {
  const nbr = Math.trunc(stars);
  var rows = [];
  for (var i = 0; i < nbr; i++) {
    rows.push(
      <li className="list-inline-item">
        <BsStarFill />
      </li>
    );
  }
  if (stars !== nbr) {
    rows.push(
      <li className="list-inline-item">
        <BsStarHalf />
      </li>
    );
    for (i = 0; i < 4 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  } else {
    for (i = 0; i < 5 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  }
  return rows;
}
var data = {
  filter: [
    {
      name: "Size",
      option: [
        { name: "S", nombreProduct: 12 },
        { name: "M", nombreProduct: 8 },
        { name: "L", nombreProduct: 19 },
        { name: "XL", nombreProduct: 24 },
        { name: "XXL", nombreProduct: 6 },
        { name: "XXXL", nombreProduct: 0 },
      ],
    },
    {
      name: "Colors",
      option: [
        { name: "White", nombreProduct: 12 },
        { name: "Blue", nombreProduct: 8 },
        { name: "Red", nombreProduct: 19 },
        { name: "Green", nombreProduct: 24 },
        { name: "Pink", nombreProduct: 6 },
        { name: "Balck", nombreProduct: 0 },
      ],
    },

    {
      name: "Size",
      option: [
        { name: "S", nombreProduct: 12 },
        { name: "M", nombreProduct: 8 },
        { name: "L", nombreProduct: 19 },
        { name: "XL", nombreProduct: 24 },
        { name: "XXL", nombreProduct: 6 },
        { name: "XXXL", nombreProduct: 0 },
      ],
    },
  ],
  products: [
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },

    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
    {
      id: 1254,
      name: "Iphone 13",
      stars: 3.5,
      lastPrise: 4300.0,
      newPrise: 3980.0,
      picture: "https://picsum.photos/id/365/500/500",
      link: "/electronique/smartphone/smartphone/Iphone",
    },
  ],
  nbrOfProduct: 127,
};

const Category = () => {
  const { categ, sousCateg, sousSousCateg } = useParams();
  return (
    <div className="container-lg">
      <div className="navigation">
        {"MarketPlace > "}
        {categ ? categ : ""}
        {sousCateg ? " > " + sousCateg : ""}
        {sousSousCateg ? " > " + sousSousCateg : ""}
      </div>
      <div className="row">
        <div className="d-none d-md-block col-3">
          <div className="Filter  bg-white rounded p-3">
            <div className="titleFilter">Filter by</div>
            {data.filter.map((variable, key) => {
              return (
                <>
                  <div className="titleVariable">{variable.name}</div>
                  <div className="p-3">
                    {variable.option.map((opt) => {
                      return (
                        <div>
                          <input
                            type="checkbox"
                            id={opt.name}
                            name={opt.name}
                          />
                          <label for={opt.name}>
                            {opt.name}
                            <span class="badge rounded-pill">
                              {opt.nombreProduct}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="Products bg-white rounded">
            <div className="titleProducts">
              {categ}
              <div className="trie">
                <select name="trie" id="trie">
                  <option value="0">Trie number one</option>
                  <option value="1">Trie number two</option>
                  <option value="2">Trie number three</option>
                </select>
              </div>
            </div>
            <div className="row">
              {data.products.map((item, key) => {
                return (
                  <div className="col-6 col-sm-4 col-md-4 col-lg-3 mb-3">
                    <Link to={"/"}>
                      <div className="itemProduct m-1" key={key}>
                        <div className="thumb-wrapper">
                          <div className="position-relative img-box">
                            <div
                              className="position-absolute imgProduct"
                              style={{
                                backgroundImage: "url(" + item.picture + ")",
                              }}
                            ></div>
                          </div>
                          <div className="thumb-content">
                            <h4>{item.name}</h4>
                            <p className="item-price">
                              <strike>{item.lastPrise} TND</strike>{" "}
                              <b>{item.newPrise} TND</b>
                            </p>
                            <div className="star-rating">
                              <ul className="list-inline">
                                {showStars(item.stars)}
                              </ul>
                            </div>
                            <Link
                              className="btn btn-orange btn-sm"
                              to={item.link}
                              data-abc="true"
                            >
                              Add to Cart
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
