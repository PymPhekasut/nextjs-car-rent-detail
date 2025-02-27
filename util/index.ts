import { CarProps, FilterProps } from "@/types";

export async function fetchCars (filters: FilterProps ) {
    const {manufacturer, year, model, limit, fuel} = filters

    const headers = {
        'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
        'x-rapidapi-host': `${process.env.RAPID_API_HOST}`
    }
    const response =  await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers,
    })
    const result = await response.json()
    return result

}


export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 



export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  }; 


  export const updateSearchParams = (type: string, value: string) =>{
     //Get search paramerter
     const searchParams = new URLSearchParams(window.location.search)
     searchParams.set(type, value)
     const newPathname = `${window.location.pathname}?${searchParams.toString()}`
     return newPathname
  }