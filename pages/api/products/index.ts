import type { NextApiRequest, NextApiResponse } from "next";
import { getLimitAndOffsetFromReq } from "lib/request";
import methods from "micro-method-router";
import { productsIndex } from "lib/algolia";

module.exports = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { offset, limit } = getLimitAndOffsetFromReq(req);

    //trae los resultados de algolia
    const hits = await productsIndex.search(req.query.q as string, {
      length: limit,
      offset,
    });

    res.send({
      results: hits.hits,
      pagination: {
        results: hits.hits.length,
        offset,
        limit,
        total: hits.nbHits,
      },
    });
  },
});
