import { MovieCardSkeleton } from "@/common/components/MovieCardSkeleton/MovieCardSkeleton";

type MovieGridSkeletonProps = {
  count?: number;
};

export const MovieGridSkeleton = ({
                                    count = 6,
                                  }: MovieGridSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </>
  );
};