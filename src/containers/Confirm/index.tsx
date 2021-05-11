import { Dayjs } from "dayjs";
import { isNil } from "ramda";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { LeaveModal } from "../../components/LeaveModal";
import { TravelRecord, useTravelRecord } from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { AutoLeaveModal } from "./AutoLeaveModal";
import { ConfirmPage } from "./ConfirmPage";

type Props = {
  confirmPageIcon?: string | null;
};

export const Confirm = ({ confirmPageIcon }: Props) => {
  const browserHistory = useHistory();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation<TravelRecord>();
  const { updateTravelRecord, getTravelRecord } = useTravelRecord();

  const [isAutoLeaveModalOpen, setIsAutoLeaveModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const travelRecord = useMemo(() => (state ? state : getTravelRecord(id)), [
    state,
    getTravelRecord,
    id,
  ]);

  useEffect(() => {
    if (!travelRecord) browserHistory.replace("/");
  }, [travelRecord, browserHistory]);

  const [autoLeave, setAutoLeave] = useState(
    travelRecord ? !isNil(travelRecord.outTime) : true
  );
  const [autoLeaveHour, setAutoLeaveHour] = useState(
    travelRecord && travelRecord.outTime
      ? dayjs(travelRecord.outTime).diff(travelRecord.inTime, "hour")
      : 4
  );

  const inTime = useMemo(
    () => (travelRecord ? travelRecord.inTime : dayjs().toISOString()),
    [travelRecord]
  );

  const handleSetAutoLeaveHour = (value: number) => {
    setAutoLeaveHour(value);
    setIsAutoLeaveModalOpen(false);
  };

  const handleLeavePage = () => {
    setIsAutoLeaveModalOpen(false);
    setIsLeaveModalOpen(false);
    browserHistory.push("/");
  };

  const handleLeave = (date: Dayjs) => {
    updateTravelRecord(id, {
      outTime: date.startOf("minute").toISOString(),
    });
    handleLeavePage();
  };

  useEffect(() => {
    const toDate = dayjs(inTime).add(autoLeaveHour, "hour");
    updateTravelRecord(id, {
      outTime: autoLeave ? toDate.toISOString() : undefined,
    });
  }, [autoLeave, autoLeaveHour, updateTravelRecord, id, inTime]);

  return travelRecord ? (
    <>
      <ConfirmPage
        travelRecord={travelRecord}
        confirmPageIcon={confirmPageIcon}
        autoLeave={autoLeave}
        setAutoLeave={setAutoLeave}
        autoLeaveHour={autoLeaveHour}
        handleChangeAutoLeaveHour={() => {
          setIsAutoLeaveModalOpen(true);
        }}
        handleLeave={() => {
          setIsLeaveModalOpen(true);
        }}
      />
      <AutoLeaveModal
        isModalOpen={isAutoLeaveModalOpen}
        onCancel={() => {
          setIsAutoLeaveModalOpen(false);
        }}
        onConfirm={handleSetAutoLeaveHour}
        selectedAutoLeaveHour={autoLeaveHour}
        date={dayjs(inTime)}
      />
      <LeaveModal
        id={id}
        visible={isLeaveModalOpen}
        onDiscard={() => {
          setIsLeaveModalOpen(false);
        }}
        onFinish={handleLeave}
      />
    </>
  ) : (
    <></>
  );
};
