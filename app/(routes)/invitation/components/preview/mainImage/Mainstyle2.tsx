import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle2 = ({ wedding }) => {
  const { mainImage } = useMainImageStore();
  const { date, time, groom, bride, hallName, hallDetail } = wedding;
  const year = date.year;
  const month = date.month;
  const day = date.day;
  const groomName = groom.lastName + groom.firstName;
  const brideName = bride.lastName + bride.firstName;
  const timeOfDay = time.timeOfDay;
  const hour = time.hour;
  const min = time.min;

  return (
    <div
      className="bg-[#FFFFFF] pt-[46px] text-[#5E5852]"
      style={{ fontFamily: "NanumMyeongjo" }}
    >
      <div className="text-center text-[20px]">
        <span className="font-extrabold">
          {groomName} ♥ {brideName}
        </span>
        <div className="text-center text-[14px] pt-[30px]">
          <p>
            {year}년 {month}월 {day}일 토요일 {timeOfDay} {hour} {min}
          </p>
          <p>
            {hallDetail}, {hallName}
          </p>
        </div>
        {mainImage !== "" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImagePath(mainImage)}
            alt="메인 이미지"
            className="h-[760px] object-cover"
            style={{
              WebkitMaskImage: `linear-gradient(
      180deg,
      transparent 0%,
      rgba(0,0,0,0.25) 10%,
      rgba(0,0,0,1) 20%,
      rgba(0,0,0,1) 80%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )`,
              maskImage: `linear-gradient(
      180deg,
      transparent 0%,
      rgba(0,0,0,0.25) 10%,
      rgba(0,0,0,1) 20%,
      rgba(0,0,0,1) 80%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "cover",
            }}
          />
        ) : (
          <div className="bg-[#D9D9D9] h-[760px]"></div>
        )}
      </div>
    </div>
  );
};

export default Mainstyle2;
