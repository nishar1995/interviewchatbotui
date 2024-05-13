'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import isEmpty from 'lodash/isEmpty';
import prettyBytes from 'pretty-bytes';
import { useCallback, useState } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import { PiCheckBold, PiTrashBold, PiUploadSimpleBold } from 'react-icons/pi';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { useUploadThing } from '@/utils/uploadthing';
import { Button, Text, FieldError } from 'rizzui';
import cn from '@/utils/class-names';
import UploadIcon from '@/components/shape/upload';
import { endsWith } from 'lodash';
import { FileWithPath } from 'react-dropzone';
import { ClientUploadedFileData } from 'uploadthing/types';

interface UploadZoneProps {
  label?: string;
  name: string;
  getValues: any;
  setValue: any;
  className?: string;
  error?: string;
}

interface FileType {
  name: string;
  url: string;
  size: number;
}

export default function UploadZone({
  label,
  name,
  className,
  getValues,
  setValue,
  error,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      console.log('acceptedFiles', acceptedFiles);
      setFiles([
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
  );

  function handleRemoveFile(index: number) {
    // Make a copy of the files array
    const updatedFiles = [...files];

    // Remove the file at the specified index
    updatedFiles.splice(index, 1);

    // Update the state
    setFiles(updatedFiles);
  }

  const uploadedItems = isEmpty(getValues(name)) ? [] : getValues(name);

  const notUploadedItems = files.filter(
    (file) =>
      !uploadedItems?.some(
        (uploadedFile: FileType) => uploadedFile.name === file.name
      )
  );

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    'generalMedia',
    {
      onClientUploadComplete: (
        res: ClientUploadedFileData<any>[] | undefined
      ) => {
        console.log('res', res);
        if (setValue) {
          // const respondedUrls = res?.map((r) => r.url);
          setFiles([]);
          const respondedUrls = res?.map((r) => ({
            name: r.name,
            size: r.size,
            url: r.url,
          }));
          setValue(name, respondedUrls);
        }
        toast.success(
          <Text as="b" className="font-semibold">
            portfolio Images updated
          </Text>
        );
      },
      onUploadError: (error: Error) => {
        console.error(error);
        toast.error(error.message);
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div className={cn('grid @container', className)}>
      {label && (
        <span className="mb-1.5 block font-semibold text-gray-900">
          {label}
        </span>
      )}
      <div
        className={cn(
          'rounded-md border-[1.8px]',
          !isEmpty(files) &&
            'flex flex-wrap items-center justify-between @xl:flex-nowrap @xl:pr-6'
        )}
      >
        <div
          {...getRootProps()}
          className={cn(
            'flex cursor-pointer items-center gap-4 px-6 py-5 transition-all duration-300',
            isEmpty(files)
              ? 'justify-center'
              : 'flex-grow justify-center @xl:justify-start'
          )}
        >
          <input {...getInputProps()} />
          <UploadIcon className="h-12 w-12" />
          <Text className="text-base font-medium">Drop or select file</Text>
        </div>

        {!isEmpty(files) && !isEmpty(notUploadedItems) && (
          <UploadButtons
            files={notUploadedItems}
            isLoading={isUploading}
            onClear={() => setFiles([])}
            onUpload={() => startUpload(notUploadedItems)}
          />
        )}

        {isEmpty(files) && !isEmpty(notUploadedItems) && (
          <UploadButtons
            files={notUploadedItems}
            isLoading={isUploading}
            onClear={() => setFiles([])}
            onUpload={() => startUpload(notUploadedItems)}
          />
        )}

        {!isEmpty(files) && isEmpty(notUploadedItems) && (
          <UploadButtons
            files={files}
            isLoading={isUploading}
            onClear={() => setFiles([])}
            onUpload={() => startUpload(files)}
          />
        )}
      </div>

      {(!isEmpty(uploadedItems) || !isEmpty(notUploadedItems)) && (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))]">
          {uploadedItems.map((file: any, index: number) => (
            <div key={index} className={cn('relative')}>
              <figure className="group relative h-40 rounded-md bg-gray-50">
                <MediaPreview name={file.name} url={file.url} />
                <button
                  type="button"
                  className="absolute right-0 top-0 rounded-full bg-gray-700 p-1.5 transition duration-300"
                >
                  <PiCheckBold className="text-white" />
                </button>
              </figure>
              <MediaCaption name={file.name} size={file.size} />
            </div>
          ))}
          {notUploadedItems.map((file: any, index: number) => (
            <div key={index} className={cn('relative')}>
              <figure className="group relative h-40 rounded-md bg-gray-50">
                <MediaPreview name={file.name} url={file.preview} />
                {isUploading ? (
                  <div className="absolute inset-0 z-50 grid place-content-center rounded-md bg-gray-800/50">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute right-0 top-0 rounded-full bg-gray-700/70 p-1.5 opacity-20 transition duration-300 hover:bg-red-dark group-hover:opacity-100"
                  >
                    <PiTrashBold className="text-white" />
                  </button>
                )}
              </figure>
              <MediaCaption name={file.path} size={file.size} />
            </div>
          ))}
        </div>
      )}

      {error && <FieldError error={error} />}
    </div>
  );
}

function UploadButtons({
  files,
  onClear,
  onUpload,
  isLoading,
}: {
  files: any[];
  isLoading: boolean;
  onClear: () => void;
  onUpload: () => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 px-6 pb-5 @sm:flex-nowrap @xl:w-auto @xl:justify-end @xl:px-0 @xl:pb-0">
      <Button
        variant="outline"
        className="w-full gap-2 @xl:w-auto"
        isLoading={isLoading}
        onClick={onClear}
      >
        <PiTrashBold />
        Clear {files.length} files
      </Button>
      <Button
        className="w-full gap-2 @xl:w-auto"
        isLoading={isLoading}
        onClick={onUpload}
      >
        <PiUploadSimpleBold /> Upload {files.length} files
      </Button>
    </div>
  );
}

function MediaPreview({ name, url }: { name: string; url: string }) {
  return endsWith(name, '.pdf') ? (
    <object data={url} type="application/pdf" width="100%" height="100%">
      <p>
        Alternative text - include a link <a href={url}>to the PDF!</a>
      </p>
    </object>
  ) : (
    <Image
      fill
      src={url}
      alt={name}
      className="transform rounded-md object-contain"
    />
  );
}

function MediaCaption({ name, size }: { name: string; size: number }) {
  return (
    <div className="mt-1 text-xs">
      <p className="break-words font-medium text-gray-700">{name}</p>
      <p className="mt-1 font-mono">{prettyBytes(size)}</p>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor="#fff" stopOpacity="0" offset="0%" />
          <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#fff" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}
