"use client";
/* eslint-disable @next/next/no-img-element */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Loading } from "@/components/ui/loading";
import { DayDisplay } from "@/features/screens/components/screen-display/day-display";
import { TimeDisplay } from "@/features/screens/components/screen-display/time-display";
import { WeatherDisplay } from "@/features/screens/components/screen-display/weather-display";
import { useListScreenAnnouncementsQuery } from "@/features/screens/hooks/react-query/use-list-screen-announcements-query";
import { useEffect, useRef } from "react";
import { useUpdateScreenLastDeviceSeenMutation } from "@/features/screens/hooks/react-query/use-update-screen-last-device-seen-mutation";

export default function ScreenPage() {
  const hasMounted = useRef(false);
  const listScreenAnnouncementsQuery = useListScreenAnnouncementsQuery();
  const updateScreenLastDeviceSeenMutation =
    useUpdateScreenLastDeviceSeenMutation();

  useEffect(() => {
    let dim = false;

    if (!hasMounted.current) {
      hasMounted.current = true;
      updateScreenLastDeviceSeenMutation.mutate();
    }

    const screenSmoothnessInterval = setInterval(() => {
      const el = document.body;

      dim = !dim;
      el.style.filter = `brightness(${dim ? 97 : 100}%)`;
    }, 60000);

    const updateScreenLastDeviceSeenInterval = setInterval(
      () => {
        updateScreenLastDeviceSeenMutation.mutate();
      },
      2 * 60 * 1000,
    );

    return () => {
      clearInterval(screenSmoothnessInterval);
      clearInterval(updateScreenLastDeviceSeenInterval);
    };
  }, [updateScreenLastDeviceSeenMutation]);

  return (
    <div className="flex h-screen flex-col justify-between gap-6 bg-white">
      <header className="flex h-36 flex-wrap items-center justify-between gap-4 bg-[#EEFFEB] px-10 py-4">
        <section className="flex items-center gap-6">
          <DayDisplay />
          <div className="my-2 w-[3px] self-stretch bg-[#E5E7EB]" />
          <WeatherDisplay />
        </section>

        <section className="flex items-center gap-6">
          <TimeDisplay />

          <div className="my-2 w-[3px] self-stretch bg-[#E5E7EB]" />

          <div className="text-right text-[#1F2937] not-italic">
            <span className="block text-2xl font-bold">IFMS - Três Lagoas</span>
            <span className="text-xl font-medium">R. Angelo Melão, 790</span>
          </div>
        </section>
      </header>

      <main className="flex w-full flex-1 items-center justify-center bg-white">
        {listScreenAnnouncementsQuery.isLoading ? (
          <Loading label="Carregando anúncios..." />
        ) : listScreenAnnouncementsQuery.isError ? (
          <span className="text-red-500">
            Ocorreu um erro ao carregar os anúncios.
          </span>
        ) : !listScreenAnnouncementsQuery.data ||
          listScreenAnnouncementsQuery.data.length === 0 ? (
          <span className="text-gray-500">
            Nenhum anúncio disponível no momento.
          </span>
        ) : (
          <Carousel
            opts={{ loop: true, align: "center" }}
            plugins={[Autoplay({ delay: 10000 })]}
          >
            <CarouselContent className="h-full" style={{ height: "100%" }}>
              {listScreenAnnouncementsQuery.data.map((announcement) => (
                <CarouselItem
                  key={announcement.id}
                  className="flex h-full items-center justify-center"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/uploads/${announcement.mediaFilename}`}
                    alt={announcement.name}
                    className="h-full w-fit rounded-xl object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </main>

      <footer className="flex flex-wrap items-center justify-between rounded-xl bg-[#EEFFEB] px-10 py-4">
        <img
          src="/images/ifms-text.png"
          alt="Logo IFMS"
          className="h-28 rounded-none"
        />

        <section className="rounded-xl bg-white p-3 shadow-md">
          <img src="/images/logo-text.png" alt="AdTV" className="size-40" />
        </section>
      </footer>
    </div>
  );
}
