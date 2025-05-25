import express from  "express";
const app = express();
const port = 8000;
import fetch from 'node-fetch';
import { API_SERVER_DOMAIN } from "./constants";
import { urlQueryBuilder } from "./util";

app.get("/get_makes", async (req, res) => {

  const response = await fetch(`${API_SERVER_DOMAIN}/makes`);
  const data = await response.json() as any;
  if (!response.ok) {
    throw new Error(`Error fetching model info from car api, status: ${response.status}`)
  }
  res.json(data?.data.map((item: any)=> item.name));
})

app.get("/get_models", async (req, res) => {
  if (!req.query.year && !req.query.make) {
    res.status(400).send("'year' and 'make' are required query parameters!");
  }
  const url = urlQueryBuilder(req.query, `${API_SERVER_DOMAIN}/models`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching model info from car api, status: ${response.status}`)
  }
  const data = await response.json() as any;
  res.send(data?.data.map((item: any) => item.name));
})

app.get("/get_trims", async (req, res) => {
  if (!req.query.year && !req.query.make && !req.query.model) {
    res.status(400).send("'year' and 'make' and 'model' are required query parameters!");
  }

  const url = urlQueryBuilder(req.query, `${API_SERVER_DOMAIN}/trims`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching trim info from car api, status: ${response.status}`)
  }
  const data = await response.json() as any;
  res.send(data?.data.map((item: any) => ({id: item.id, name : item.name, description: item.description, msrp: item.msrp, invoice: item.invoice})));
})

app.get("/get_all_trim_info/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("'id' is a required path parameter!");
  }
  const response = await fetch(`${API_SERVER_DOMAIN}/trims/${req.params.id}`);
  if (!response.ok) {
    throw new Error(`Error fetching all information about a specific trim from car api, status: ${response.status}`)
  }
  const data = await response.json() as any;
  res.send(data);
})

app.get("/get_body", async (req, res) => {
  if (!req.query.year && !req.query.make && ! req.query.model) {
    res.status(400).send("'year' and 'make' and 'model' are required query parameters!");
  }

  const url = urlQueryBuilder(req.query, `${API_SERVER_DOMAIN}/bodies`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching body information from car api, status: ${response.status}`)
  }
  const data = await response.json() as any;
  res.send(data?.data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
