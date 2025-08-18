import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const port = 5000;


app.get('/', (req,res)=>{
    res.send('helo');
})

app.get("/get", async (req, res) => {
    const api_string = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const response = await axios.get(
      api_string,
      {
        headers: {
          "X-CMC_PRO_API_KEY": "25f6c6b0-fa4b-4f58-915d-7fddd75f33ef",
        }
      }
    );
    const coins = response.data.data;
    let coin_id = "";
    for (let i = 0; i < coins.length; i++) {
        coin_id += coins[i].id;
        if (i < coins.length - 1) {
            coin_id += ",";
        }
    }

    const coin_info = await axios.get(
        "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info",
        {
            headers: {
            "X-CMC_PRO_API_KEY": "25f6c6b0-fa4b-4f58-915d-7fddd75f33ef",
            },
            params: {
            id: coin_id
            }

        }
        );
    
    res.send(coin_info.data.data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
