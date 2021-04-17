import { Dayjs } from "dayjs";
import { propOr } from "ramda";
import React, { useMemo, useState } from "react";
import { useTime } from "../../hooks/useTime";
import { travelRecordType, useTravelRecord } from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { getVenueName } from "../../utils/qr";
import { Prompt } from "./Prompt";
import { TimePickModal } from "./TimePickModal";

type Props = {
  visible: boolean;
  onDiscard: () => void;
  onFinish: (leaveTime: Dayjs) => void;
};

export const LeaveModal = ({ visible, onDiscard, onFinish }: Props) => {
  const { currentTime } = useTime();
  const { currentTravelRecord } = useTravelRecord();
  const [isTimePickModalOpen, setIsTimePickModalOpen] = useState(false);

  const place = useMemo(() => getVenueName(currentTravelRecord), [
    currentTravelRecord,
  ]);

  const handleLeaveNow = () => {
    onFinish(currentTime);
  };

  const handleLeaveEarly = (time: Dayjs) => {
    onFinish(time);
  };

  const venueType = propOr<
    travelRecordType,
    typeof currentTravelRecord,
    travelRecordType
  >(travelRecordType.PLACE, "type", currentTravelRecord);

  return !currentTravelRecord ? (
    <></>
  ) : (
    <>
      <Prompt
        isModalOpen={visible && !isTimePickModalOpen}
        onCancel={() => {
          setIsTimePickModalOpen(false);
          onDiscard();
        }}
        onLeaveNow={handleLeaveNow}
        onLeaved={() => {
          setIsTimePickModalOpen(true);
        }}
        place={place || ""}
        date={dayjs(currentTravelRecord.inTime)}
        outTime={currentTravelRecord.outTime}
        venueType={venueType}
      />
      <TimePickModal
        isModalOpen={visible && isTimePickModalOpen}
        onCancel={() => {
          setIsTimePickModalOpen(false);
          onDiscard();
        }}
        onConfirm={handleLeaveEarly}
        date={dayjs(currentTravelRecord.inTime)}
      />
    </>
  );
};
