export default function PostCardSekeleton() {
  return (
    <div className="p-5 bg-(--color-dark-light) animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-start justify-start gap-2">
          <div className="w-10 h-10 rounded-full bg-(--color-dark-light)"></div>
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="w-24 h-4 bg-(--color-dark-light)"></div>
            <div className="flex items-center justify-start gap-1">
              <div className="w-32 h-4 bg-(--color-dark-light)"></div>
              <div className="w-4 h-4 rounded-full bg-(--color-dark-light)"></div>
            </div>
          </div>
        </div>

        <div className="bg-(--color-dark-light) w-10 h-4"></div>
      </div>

      <div className="my-5 flex flex-col items-start justify-start gap-1">
        <div className="w-40 h-4 bg-(--color-dark-light)"></div>
        <div className="w-80 h-4 bg-(--color-dark-light)"></div>

        <div className="w-full h-72 bg-(--color-dark-light)"></div>
      </div>

      <div className="flex flex-col items-start justify-start w-full mt-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start gap-1">
            <div className="w-7 h-7 bg-(--color-dark-light) rounded-full"></div>
            <div className="w-3 h-5 bg-(--color-dark-light)"></div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="w-32 h-4 bg-(--color-dark-light)"></div>
            <div className="w-32 h-4 bg-(--color-dark-light)"></div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="w-1/3 flex items-center justify-center gap-2">
            <div className="w-7 h-7 bg-(--color-dark-light)"></div>
            <div className="w-20 h-7 bg-(--color-dark-light)"></div>
          </div>
          <div className="w-1/3 flex items-center justify-center gap-2">
            <div className="w-7 h-7 bg-(--color-dark-light)"></div>
            <div className="w-20 h-7 bg-(--color-dark-light)"></div>
          </div>
          <div className="w-1/3 flex items-center justify-center gap-2">
            <div className="w-7 h-7 bg-(--color-dark-light)"></div>
            <div className="w-20 h-7 bg-(--color-dark-light)"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
