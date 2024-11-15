'use client';

import { UserAvatar } from '@repo/ui/components/user-avatar';
import { createColumnHelper } from '@tanstack/react-table';

/*
 *  Overall Leaderboard Table Columns
 */

export interface OverallLeaderboardEntry {
  totalPoints: number;
  name: string;
  image: string | null;
}

const overallLeaderboardColumnHelper = createColumnHelper<OverallLeaderboardEntry>();

export const overallLeaderboardColumns = [
  overallLeaderboardColumnHelper.display({
    id: 'ranking',
    header: '#',
    cell: (props) => props.row.index + 1,
  }),
  overallLeaderboardColumnHelper.accessor('name', {
    header: 'User',
    cell: (info) => (
      <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-4">
        <UserAvatar className="h-8 w-8 md:h-12 md:w-12" src={info.row.original.image ?? ''} />
        <span>@{info.getValue()}</span>
      </div>
    ),
  }),
  overallLeaderboardColumnHelper.accessor('totalPoints', {
    header: 'Points',
    cell: (info) => Number(info.getValue()),
  }),
];

/*
 *  Daily Leaderboard Table Columns
 */

export interface DailyLeaderboardEntry {
  createdAt: Date;
  user: { name: string; image: string | null };
}

const dailyLeaderboardColumnHelper = createColumnHelper<DailyLeaderboardEntry>();

export const dailyLeaderboardColumns = [
  dailyLeaderboardColumnHelper.display({
    id: 'ranking',
    header: '#',
    cell: (props) => props.row.index + 1,
  }),
  dailyLeaderboardColumnHelper.accessor('user', {
    header: 'User',
    cell: (info) => (
      <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-4">
        <UserAvatar className="h-8 w-8 md:h-12 md:w-12" src={info.getValue().image ?? ''} />
        <span>@{info.getValue().name}</span>
      </div>
    ),
  }),
  dailyLeaderboardColumnHelper.accessor('createdAt', {
    header: 'Time solved',
    cell: (info) => formatDate(info.getValue()),
  }),
];

/*
 *  Utilities - will move later
 */
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(date));
};
