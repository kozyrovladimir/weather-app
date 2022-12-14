import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export interface LocationI {
    name: string,
    local_names: {
        ru: string,
        ascii: string,
        feature_name: string,
        be: string,
        pl: string
    },
    lat: number,
    lon: number,
    country: string,
    state: string
}

export const locationAPI = createApi({
    reducerPath: 'locationAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://api.openweathermap.org/geo/1.0'}),
    endpoints: (build) => ({
        getLocation: build.query<LocationI[], string>({
            query: (locationNane) => ({
                url: `/direct`,
                params: {
                    q: locationNane,
                    limit: 5,
                    appid: 'ec0e499f51635cb60d364495d94b69ba'
                }
            })
        })
    })
});
