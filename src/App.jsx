import { useState } from "react";
import "./App.css";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 * index,
    },
  }),
};

function App() {
  const [data, setData] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchDataFromApi = async () => {
    await axios
      .get(
        "https://run.mocky.io/v3/92348b3d-54f7-4dc5-8688-ec7d855b6cce?mocky-delay=500ms"
      )
      .then((response) => {
        setShowButton(false);
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = async () => {
    fetchDataFromApi();
    setLoading(true);
  };

  return (
    <>
      <h1 className="text-3xl ml-5 lg:ml-16 mt-5 lg:mt-10 font-semibold">
        All Collections
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 m-5 lg:m-16">
        {data.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            <div className="border rounded-xl px-3">
              <img
                className="max-h-[200px] lg:max-h-[400px]"
                src={item.product.images[0].src}
                alt={item.product.title}
              />
              <p className="font-sans text-lg">{item?.product?.title}</p>
              <h1 className="font-sans text-xl font-semibold">
                Rs. {item.product.variants[0].price}
              </h1>
              <div className="grid place-items-center">
                <button className="bg-blue-500 text-white font-semibold rounded-lg w-full flex justify-center py-1 lg:py-2 my-3">
                  <div className="flex justify-center gap-2">
                    <IoCartOutline size={25} />
                    <span className="text-xs lg:text-base">ADD TO CART</span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showButton && (
        <div className={`grid min-h-[40vh] place-items-center`}>
          <button
            className="bg-gradient-to-r from-blue-500 to-cyan-400 py-1.5 px-5 rounded-lg text-white"
            onClick={getData}
          >
            {!loading ? "Load Products" : "Loading..."}
          </button>
        </div>
      )}
    </>
  );
}

export default App;
