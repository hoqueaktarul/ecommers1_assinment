import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
export default function Products() {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState([]);
  const [loding, setloding] = useState(false);
  let componentdidMounted = true;
  function Msg() {
    return <>"hurry! only a few items left".</>;
  }
  const filterbandproduct=(brand)=>{
    const newp=data.filter((e)=>{
      return e.brand===brand
    })
    setfilter(newp)
  }
  const Branddrop = () => {
    return (
      <div class="dropdown show">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          select brand
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <button class="dropdown-item" onClick={()=>{filterbandproduct("Apple")}}>Apple</button>
          <button class="dropdown-item" onClick={()=>{filterbandproduct("mastar watch")}}>mastar watch</button>
          <button class="dropdown-item" onClick={()=>{filterbandproduct("TC Reusable")}}>TC Reusable</button>
          <button class="dropdown-item" onClick={()=>{filterbandproduct("Fair & Clear")}}>Fair & Clear </button>
          <button class="dropdown-item" onClick={()=>{filterbandproduct("Sneakers")}}> Sneakers </button>
          <button class="dropdown-item" onClick={()=>{filterbandproduct("JIEPOLLY")}}>JIEPOLLY </button>
          <button class="dropdown-item" onClick={()=>{filterbandproduct("SKMEI 9117")}}>SKMEI 9117 </button>

        </div>
      </div>
    );
  };
  useEffect(() => {
    const getproduct = async () => {
      setloding(true);

      fetch("https://dummyjson.com/products?limit=100")
        .then((e) => e.json())
        .then((e) => {
          if (componentdidMounted) {
            setdata(e.products);
            setfilter(e.products);
            setloding(false);
          }
        });

      return () => {
        componentdidMounted = false;
      };
    };

    getproduct();
  }, []);
  const Loading = () => {
    return (
      <>
        <div>
          <div className="col-md-3">
            <Skeleton height={250} />
          </div>
          <div className="col-md-3">
            <Skeleton height={250} />
          </div>
          <div className="col-md-3">
            <Skeleton height={250} />
          </div>
          <div className="col-md-3">
            <Skeleton height={250} />
          </div>
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updateList = data.filter((x) => {
      if (cat === "electro") {
        return (
          x.category.startsWith("laptop") || x.category.startsWith("smart")
        );
      }
      return x.category.startsWith(cat);
    });
    setfilter(updateList);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-4 pb-4">
          <div className="btn btn-outline-secondary me-2">
            <Branddrop />
          </div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => {
              setfilter(data);
            }}
          >
            All
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => {
              filterProduct("mens");
            }}
          >
            Men's
          </button>
          {data.map((e) => {
            console.log(e.brand);
          })}
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => {
              filterProduct("women");
            }}
          >
            Women's
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => {
              filterProduct("skin");
            }}
          >
            skincare
          </button>

          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => {
              filterProduct("electro");
            }}
          >
            Electronics
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text fw-bold">${product.price}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn  btn-outline-secondary"
                    >
                      Buy Now
                    </Link>
                    <p
                      style={{
                        color: "green",
                        fontSize: "10px",
                        fontWeight: "700"
                      }}
                    >
                      {product.stock < 50 ? <Msg /> : null}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="container " style={{ marginTop: "80px" }}>
      <div className="row">
        <div className="col-12 mb-1">
          <h1 className="display-6 fw-bolder text-center">Letest products</h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loding ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}
