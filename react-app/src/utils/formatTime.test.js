import {timeToSeconds, secondsToTime} from './formatTime';

describe('timeToSeconds', () => {
    it('should convert just seconds', () => {
        expect(timeToSeconds("30")).toBe(30);
        expect(timeToSeconds("")).toBe(0);
        expect(timeToSeconds("0.5")).toBe(0.5);
        expect(timeToSeconds("0")).toBe(0);
        expect(timeToSeconds("59.122")).toBe(59.122);
        expect(timeToSeconds.bind(undefined, "60")).toThrow();
        expect(timeToSeconds.bind(undefined, "-1")).toThrow();
    });

    it('should convert minutes and seconds', () => {
        expect(timeToSeconds("1:00")).toBe(60);
        expect(timeToSeconds("1:01")).toBe(61);
        expect(timeToSeconds("59:59")).toBe(3599);
        expect(timeToSeconds.bind(undefined, "60:00")).toThrow();
        expect(timeToSeconds.bind(undefined, "1:60")).toThrow()
        expect (timeToSeconds.bind(undefined, "-1:00")).toThrow();
    });

    it('should convert hours, minutes, and seconds', () => {
        expect(timeToSeconds("1:00:00.1")).toBe(3600.1);
        expect(timeToSeconds("1:01:00")).toBe(3660);
        expect(timeToSeconds("1:01:01")).toBe(3661);
        expect(timeToSeconds("0:00:01")).toBe(1);
        expect(timeToSeconds("0:01:00")).toBe(60);
        expect(timeToSeconds.bind(undefined, "-1:00:00")).toThrow();
        expect(timeToSeconds.bind(undefined, "1:-1:0")).toThrow();
        expect(timeToSeconds.bind(undefined, "0:00:-1")).toThrow();
        
    });

    it('should convert days, too', () => {
        expect(timeToSeconds("1:00:00:00")).toBe(86400);
        expect(timeToSeconds("1:01:00:00")).toBe(90000);
        expect(timeToSeconds("1:01:01:00")).toBe(90060);
        expect(timeToSeconds("1:01:01:22")).toBe(90082);
        expect(timeToSeconds.bind(undefined, "2:00:00:00")).toThrow();
        expect(timeToSeconds.bind(undefined, "1:00:00:-00")).toThrow();
    })
})

describe('secondsToTime', () => {
    it('should convert seconds to time strings', () => {
        expect(secondsToTime(1)).toBe("0:01");
        expect(secondsToTime(45)).toBe("0:45");
        expect(secondsToTime(60)).toBe("1:00");
        expect(secondsToTime(70)).toBe("1:10");
        expect(secondsToTime(120)).toBe("2:00");
        expect(secondsToTime(600)).toBe("10:00");
        expect(secondsToTime(3600)).toBe("1:00:00");
        expect(secondsToTime(3660.1)).toBe("1:01:00.1");
        expect(secondsToTime(60.5)).toBe("1:00.5")
        expect(secondsToTime(60.55555)).toBe("1:00.56")
    })
})