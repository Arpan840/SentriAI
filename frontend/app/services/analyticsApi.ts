"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getOverview: builder.query<any,void>({
      query: () => "/analytics/overview",
    }),
  }),
});

export const { useGetOverviewQuery } = analyticsApi;