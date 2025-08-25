import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());



app.get('/api/fetch-latest', async (req, res) => {
    const api_string = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const response = await axios.get(
        api_string,
        {
            headers: {
                "X-CMC_PRO_API_KEY": "564ae5c4-c6c6-46d2-9a32-fa5e7c474a2a",
            }
        }
    );
    let coins = response.data.data;

    for (let i = 0; i < coins.length; i++) {
        let temp = {
            rank: coins[i].cmc_rank,
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
    res.send({ "all_coins": coins, "status": coins ? true : false });
})

app.get("/api/get", async (req, res) => {
    const api_string = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const response = await axios.get(
        api_string,
        {
            headers: {
                "X-CMC_PRO_API_KEY": "564ae5c4-c6c6-46d2-9a32-fa5e7c474a2a",
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
                "X-CMC_PRO_API_KEY": "564ae5c4-c6c6-46d2-9a32-fa5e7c474a2a",
            },
            params: {
                id: coin_id
            }

        }
    );
    for (let i = 0; i < coins.length; i++) {
        let temp = {
            rank: coins[i].cmc_rank,
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

    res.send({ "all_coins": coins, "logos": coin_logos, "status": coins && coin_logos ? true : false });

});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
console.log("Will listen on PORT =", PORT);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

