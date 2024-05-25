'use client';

import { useEffect, useRef, useState } from 'react';
import { PiFilePdf, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Upload from '@/components/ui/upload';
import SimpleBar from 'simplebar-react';
import {
  CreateApplicationInput,
  createApplicationSchema,
} from '@/utils/validators/create-application.schema';
import { useQueryClient } from '@tanstack/react-query';

import { tenantQueryKey } from '../add-tenant';
import { tenantSchema } from '@/utils/validators/tenant.schema';
import { addTenant, updateTenant } from '@/services/tenantService';
import { Country, State, City } from 'country-state-city';


export default function CreateTenant({ onClose, tenantDetails }: any) {
  console.log("tenant details", tenantDetails)
  console.log("country list", Country.getAllCountries())
  console.log("country223344 list", State.getAllStates())
  // const defaultValues: Omit<
  //   tenantSchema,
  //   'tenantName'
  // > & {
  //   name: string;
  //   address_line1: string;
  //   address_line2: string;
  //   city: string;
  //   state: string;
  //   country: string;
  //   zip_code: string; // Add 'tenantName' property
  // } = {
  //   name: '', // Initialize 'tenantName' property
  //   address_line1: '',
  //   address_line2: '',
  //   city: '',
  //   state: '',
  //   country: '',
  //   zip_code: '',

  // };

  const defaultValues = {
    name: tenantDetails?.name || '',
    address_line1: tenantDetails?.address_line1 || '',
    address_line2: tenantDetails?.address_line2 || '',
    city: tenantDetails?.city || '',
    state: tenantDetails?.state || '',
    country: tenantDetails?.country || '',
    zip_code: tenantDetails?.zip_code || '',
  }


  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleCountryChange = (e: any) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setCities([]);
  };

  const handleCityChange = (e: any) => {
    debugger
    console.log("select city", e)
    setSelectedCity(e.target.value);
  };

  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
  };
  const onSubmit: SubmitHandler<tenantSchema> = async (data: any) => {
    console.log(data);
    setLoading(true);
    if (tenantDetails) {
      try {
        const response = await updateTenant(tenantDetails.id, data);
        if (response) {
          console.log(response);
          setLoading(false);
          setReset({
            ...defaultValues,
          });
          closeModal();
          onClose();
        }
      } catch (error) {
        console.log("error", error)
        setLoading(false);

      }
    }
    else {
      try {
        const response = await addTenant(data);
        if (response) {
          console.log(response);
          setLoading(false);
          setReset({
            ...defaultValues,
          });
          closeModal();
          onClose();
        }
      } catch (error) {
        console.log("error", error)
        setLoading(false);

      }
    }


    // setLoading(true);
    // // set timeout ony required to display loading state of the create category button
    // const formattedData = {
    //   ...data,
    //   createdAt: new Date(),
    // };

    // console.log(data);
    // const formData = new FormData();
    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     if (key === 'candidateFiles' && data[key]) {
    //       // data[key].forEach((file: any, index: any) => {
    //       //   formData.append(`${key}[${index}]`, file);
    //       // });
    //       formData.append('candidateFiles', data.candidateFiles[0]);
    //     } else {
    //       formData.append(key, data[key]);
    //     }
    //   }
    // }

    // let uploadedFilePath = '';
    // console.log(formData);
    // formData.append('candidateFiles', uploadedFilePath);
    // fetch('http://127.0.0.1:5000/upload_application_data', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     // 'Content-Type': 'application/json',
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result);
    //     queryClient.invalidateQueries({ queryKey: [tenantQueryKey] });
    //     setLoading(false);
    //     setReset({
    //       ...defaultValues,
    //     });
    //     closeModal();
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     setLoading(false);
    //   });
    // setLoading(true);
    // setTimeout(() => {
    //   console.log('formattedData', formattedData);
    //   setLoading(false);
    //   setReset({
    //     ...defaultValues,
    //   });
    //   closeModal();
    // }, 600);
  };

  return (
    <Form<tenantSchema>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={tenantSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {tenantDetails ? 'Update Tenant' : 'Add Tenant'}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Tenant Name"
              placeholder="Enter Tenant full name"
              {...register('name')}
              defaultValue={defaultValues.name}
              className="col-span-full"
            //error={errors.candidateName?.message}
            />

            <Input
              label="Address Line1"
              placeholder="Address Line1"
              className="col-span-full"
              {...register('address_line1')}
              defaultValue={defaultValues.address_line1}
            //error={errors.job?.message}
            />

            <Input
              label="Address Line2"
              placeholder="Enter Address Line2"
              className="col-span-full"
              {...register('address_line2')}
              defaultValue={defaultValues.address_line2}
            //error={errors.meetingSchedule?.message}
            />
            {/* 
            <Input
              label="City"
              placeholder="Enter city"
              className="col-span-full"
              {...register('city')}
              defaultValue={defaultValues.city}
            //error={errors.meetingSchedule?.message}
            /> */}

            {/* <Input
              label="Country"
              placeholder="Enter Country"
              className="col-span-full"
              {...register('country')}
              defaultValue={defaultValues.country}
            //error={errors.meetingSchedule?.message}
            /> */}

            <label htmlFor="country">Country</label>
            <select id="country" className="col-span-full border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('country', { required: 'State is required' })}
              defaultValue={defaultValues.country} value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {countries.map((country: any) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            <label htmlFor="state">State</label>
            <select id="state" className="col-span-full border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('state', { required: 'State is required' })}
              defaultValue={defaultValues.state} value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
              <option value="">Select State</option>
              {states.map((state: any) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>

            <label htmlFor="city">City</label>
            <select id="city" className="col-span-full border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('city', { required: 'City is required' })}
              defaultValue={defaultValues.city} value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
              <option value="">Select City</option>
              {cities.map((city: any) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <Input
              label="Zip Code"
              placeholder="Enter Zip Code"
              className="col-span-full"
              {...register('zip_code')}
              defaultValue={defaultValues.zip_code}
            //error={errors.meetingSchedule?.message}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                {tenantDetails ? 'Update Tenant' : 'Add Tenant'}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
