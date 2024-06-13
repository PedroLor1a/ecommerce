import PageController from "@/components/PageController";
//Imports Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  getProducts,
  getProductsByName,
  getProductsFilterAsc,
  getProductsFilterDesc,
} from "./lib/data";
import Image from "next/image";

function acortarTexto(texto, longitudMaxima) {
  if (texto.length > longitudMaxima) {
    return texto.substring(0, longitudMaxima) + "...";
  } else {
    return texto;
  }
}

export const products = await getProducts();
export const productsLength = products.length;
export const defaultPage = 1;
export const itemPerPage = 6;

export default async function HomePage({ searchParams }) {
  const page = Number(searchParams?.page || defaultPage);
  if (page < 1 || page > productsLength / itemPerPage)
    return <div>Invalid page</div>;

  const query = searchParams?.search;
  const queryFilter = searchParams?.filter;

  let productsRender;
  if (query) {
    productsRender = await getProductsByName(query);
  } else if (queryFilter === "ASC") {
    productsRender = await getProductsFilterDesc();
  } else if (queryFilter === "DESC") {
    productsRender = await getProductsFilterAsc();
  } else if (queryFilter === "ALL") {
    productsRender = await getProducts();
  } else {
    productsRender = await getProducts();
  }

  return (
    <div>
      <div className="flex flex-wrap my-20 mx-32">
        {productsRender
          .slice((page - 1) * itemPerPage, page * itemPerPage)
          .map((product) => (
            <div key={product.id} className="w-64 h-96 mx-16 my-2">
              <Card
                sx={{ maxWidth: 345 }}
                className="my-2 rounded-xl w-80 h-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={0}
                  className="float-right mx-1 my-2 max-w-24  h-40"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {acortarTexto(product.title, 25)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="overflow-y-clip">
                    {acortarTexto(product.description, 50)}
                  </Typography>
                </CardContent>
                {/* <Button size="small">Buy</Button> */}
                <Typography className="font-bold text-center">
                  ${product.price}
                </Typography>
              </Card>
            </div>
          ))}
      </div>
      <PageController page={page} />
    </div>
  );
}
