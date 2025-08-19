import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const port = 5000;


app.get('/fetch-latest', async(req, res) => {
    const api_string = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const response = await axios.get(
        api_string,
        {
            headers: {
                "X-CMC_PRO_API_KEY": "25f6c6b0-fa4b-4f58-915d-7fddd75f33ef",
            }
        }
    );
    let coins = response.data.data;

    for (let i = 0; i < coins.length; i++) {
        let temp = {
            rank :coins[i].cmc_rank,
            id: coins[i].id,
            name: coins[i].name
        };
        if (coins[i].quote?.USD?.price) {
            temp.price = coins[i].quote?.USD?.price?.toFixed(2);
        }
        if (coins[i].quote?.USD?.percent_change_1h) {
            temp.one_h = coins[i].quote?.USD?.percent_change_1h.toFixed(2);
        }
        if (coins[i].quote?.USD?.percent_change_24h) {
            temp.one_day = coins[i].quote?.USD?.percent_change_24h.toFixed(2);
        }
        if (coins[i].quote?.USD?.percent_change_7d) {
            temp.seven_day = coins[i].quote?.USD?.percent_change_7d.toFixed(2);
        }
        coins[i] = temp;
    }
    res.send({ "all_coins": coins});
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
    let coins = response.data.data;
    let coin_id = "";
    let coin_logos = [];
    for (let i = 0; i < coins.length; i++) {
        if (i == 100) {
            break;
        }
        if (coins[i].id) {
            coin_id += coins[i].id;
            if (i < coins.length - 1) {
                coin_id += ",";
            }
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
    for (let i = 0; i < coins.length; i++) {
        let temp = {
            rank :coins[i].cmc_rank,
            id: coins[i].id,
            name: coins[i].name
        };
        if (coins[i].quote?.USD?.price) {
            temp.price = coins[i].quote?.USD?.price?.toFixed(2);
        }
        if (coins[i].quote?.USD?.percent_change_1h) {
            temp.one_h = coins[i].quote?.USD?.percent_change_1h.toFixed(2);
        }
        if (coins[i].quote?.USD?.percent_change_24h) {
            temp.one_day = coins[i].quote?.USD?.percent_change_24h.toFixed(2);
        }
        if (coins[i].quote?.USD?.percent_change_7d) {
            temp.seven_day = coins[i].quote?.USD?.percent_change_7d.toFixed(2);
        }
        if (coin_info.data.data[coins[i].id]) {
            coin_logos[coins[i].id] = coin_info.data.data[coins[i].id].logo;
        }
        coins[i] = temp;
    }
    console.log(coins[0]);
    res.send({ "all_coins": coins,"logos":coin_logos});

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
