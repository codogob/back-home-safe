import { Dayjs } from "dayjs";
import { propOr } from "ramda";
import React, { useMemo, useState } from "react";

import { useI18n } from "../../hooks/useI18n";
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
  id: string;
};

export const LeaveModal = ({ id, visible, onDiscard, onFinish }: Props) => {
  const { currentTime } = useTime();
  const { getTravelRecord } = useTravelRecord();
  const [isTimePickModalOpen, setIsTimePickModalOpen] = useState(false);
  const { language } = useI18n();

  const travelRecord = useMemo(() => getTravelRecord(id), [
    id,
    getTravelRecord,
  ]);

  const place = useMemo(
    () => (travelRecord ? getVenueName(travelRecord, language) : ""),
    [travelRecord, language]
  );

  const handleLeaveNow = () => {
    onFinish(currentTime);
  };

  const handleLeaveEarly = (time: Dayjs) => {
    onFinish(time);
  };

  const venueType = propOr<
    travelRecordType,
    typeof travelRecord,
    travelRecordType
  >(travelRecordType.PLACE, "type", travelRecord);

  return !travelRecord ? (
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
        date={dayjs(travelRecord.inTime)}
        outTime={travelRecord.outTime}
        venueType={venueType}
      />
      <TimePickModal
        isModalOpen={visible && isTimePickModalOpen}
        onCancel={() => {
          setIsTimePickModalOpen(false);
          onDiscard();
        }}
        onConfirm={handleLeaveEarly}
        date={dayjs(travelRecord.inTime)}
      />
    </>
  );
};
