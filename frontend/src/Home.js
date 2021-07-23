import React, { useEffect } from "react";
import "./Home.css";
import { Shake } from "reshake";
import Product from "./Product";
// import data from "./data.js";
import Slider from "./Slider";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import { useStateValue } from "./StateProvider";
import Video from "./Video";

function Home() {
  const [{ products, loading, error, basket }, dispatch] = useStateValue();

  useEffect(() => {
    const listProducts = async () => {
      dispatch({
        type: "REQUEST_SEND",
        loading: true,
        error: false,
      });
      try {
        const { data } = await axios.get("/api/products");
        dispatch({
          type: "PRODUCT_LIST_SUCCESS",
          loading: false,
          products: data,
        });
      } catch (error) {
        dispatch({
          type: "REQUEST_FAIL",
          loading: false,
          error: error.message,
        });
      }
    };
    listProducts();
  }, [dispatch]);

  return (
    <>
      {error ? (
        <ErrorBox error={error} />
      ) : (
        <div className="home">
          <header className="home__banner" title="Look your Best">
            <p>
              <span>
                Stitched with
                <Shake
                  h={64}
                  v={66}
                  r={82}
                  dur={930}
                  int={63.3}
                  max={100}
                  fixed={true}
                  fixedStop={false}
                  freez={false}
                >
                  💗
                </Shake>
              </span>
              <span>Online boutique for all your customisations</span>
            </p>
          </header>
          {loading ? (
            <LoadingBox loading={loading} />
          ) : (
            <section className="home__products">
              {products
                ?.filter((items) => items?.category === "Best Sellers")
                ?.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </section>
          )}
          <Slider
            sliderCategory={products?.filter(
              (items) => items?.category === "New Arrivals"
            )}
          />
          <Video />

          <div className="home__intro forPadding">
            <p className="home__introHeading">Who We Are ?</p>
            <div className="square peach-position"></div>
            <div className="square blue-position"></div>
            <div className="arrow-down"></div>
            <p className="home__introPara">
              Quaerat provident commodi consectetur veniam similique ad earum
              omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
              fugiat, dolorum eligendi quam cupiditate excepturi mollitia
              maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat
              non architecto ab laudantium modi minima sunt esse temporibus sint
              culpa, recusandae aliquam numquam totam ratione voluptas quod
              exercitationem fuga. Possimus quis earum veniam quasi aliquam
              eligendi, placeat qui corporis!
            </p>
          </div>
          <div className="home__intro forBackground">
            <p className="home__introHeading">We Make Life Easy</p>
            <div className="home__introPara home__comment">
              <div className="bigCircle bc1"></div>
              <div className="smallCircle sc1"></div>
              <div className="bigCircle bc2"></div>
              <div className="smallCircle sc2"></div>
              <p>
                ♥ Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                harum nesciunt ipsum debitis quas aliquid ♥
              </p>
              <p>By Roopali</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
