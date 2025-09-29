import { useEffect, useState } from "react";

function Uptimedisplay() {
    const [uptime, setUptime] = useState(null);

    useEffect(() => {
	fetch("https://api.uptimerobot.com/v2/getMonitors", {
	    method: "POST",
	    headers: { "Content-Type": "application/x-www-form-urlencoded" },
	    body: new URLSearchParams({
		api_key: "m801470619-6a4aa2fa3a68863bc7f4f7c2",
		format: "json",
	    }),
	})
	    .then(res => res.json())
	    .then(data => {
		if(data.monitors && data.monitors.length > 0){
		    const monitor = data.monitors[0];
		    const lastUp = monitor.logs?.find(l => l.type === 1 && l.reason?.code === 200)?.datetime;
		    const startTime = lastUp ? lastUp * 1000 : monitor.create_datetime * 1000;
		    const diff = Date.now() - startTime;
		    const hours = Math.floor(diff/(1000*60*60));
		    const min = Math.floor((diff / (1000*60)) % 60);
		    setUptime(`${hours}h ${min}m`);
		}
	    });
    }, []);

    return (
	<span>
	    {uptime ? `Up for ${uptime}` : "Loading uptime..."}
	</span>
    );
}

export default Uptimedisplay;
