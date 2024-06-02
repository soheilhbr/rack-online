import { Button, Eventcalendar, formatDate, Popup, setOptions, Toast, localeFa } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useMemo,useState,useRef,useCallback } from 'react';
import './App.css';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker from "react-multi-date-picker"
import "react-multi-date-picker/styles/layouts/mobile.css"

setOptions({
  locale: localeFa,
  theme: 'material',
  themeVariant: 'light',
  rtl:true,
 display:"bubble",
});

function App() {
  const myView = useMemo(
    () => ({
      timeline: {
        type: 'month',
        // resolutionHorizontal:'hour',
        size:1
        // maxEventStack:'all',
        // timeCellStep:1320,
        // timeLabelStep:-1320,
      
        // startTime:"14:00",
        // endTime:'12:00'
     
        // endTime:"12:00",
       
      
      },

    }),
    [],
  );
  const onResize = useCallback(() => {
    // on resize logic
  }, []);


  const myEvents = useMemo(
    () => [
      {
        start: '2024-05-01T00:00',
        end: '2024-05-03T00:00',
        title: 'sidg ',
        resource: 1,
      },
      {
        start: '2024-05-10T09:00',
        end: '2024-05-15T15:00',
        title: 'Event 2',
        resource: 3,
      },
      {
        start: '2024-05-12T00:00',
        end: '2024-05-14T00:00',
        title: 'Event 3',
        resource: 4,
      },
      {
        start: '2024-05-15T07:00',
        end: '2024-05-20T12:00',
        title: 'Event 4',
        resource: 5,
      },
      {
        start: '2024-05-03T00:00',
        end: '2024-05-10T00:00',
        title: 'Event 5',
        resource: 6,
      },
      {
        start: '2024-05-10T08:00',
        end: '2024-05-11T20:00',
        title: 'Event 6',
        resource: 7,
      },
      {

        start: '2024-05-22T00:00',
        end: '2024-05-28T00:00',
        title: 'Event 7',
        resource: 7,
      },
      {
        start: '2024-05-08T00:00',
        end: '2024-05-13T00:00',
        title: 'Event 8',
        resource: 15,
      },
      {
        start: '2024-05-25T00:00',
        end: '2024-05-27T00:00',
        title: 'Event 9',
        resource: 10,
      },
      {
        start: '2024-05-20T00:00',
        end: '2024-05-23T00:00',
        title: 'Event 10',
        resource: 12,
      },
    ],
    [],
  );

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: 'اتاق های یک تخته',
        background:"#aaaaff",
        color: '#e20000',
        collapsed:true,

        
        children:[{
          id: 23,
          name: 'اتاق101',
          color: '#e20000',
          collapsed:true,
        },
        {
          id: 24,
          name: 'اتاق 102',
          color: '#e20000',
          collapsed:true,
        },
        {
          id: 25,
          name: 'اتاق103',
          color: '#e20000',
          collapsed:true,
        },
        {
          id: 26,
          name: 'اتاق104',
          color: '#e20000',
          collapsed:true,
        }
        ,{
          id: 27,
          name: 'اتاق105',
          color: '#e20000',
          collapsed:true,
        }
      
      ]
       
      },
      {
        id: 2,
        name: 'Resource B',
        color: '#76e083',
      },
      {
        id: 3,
        name: 'Resource C',
        color: '#4981d6',
      },
      {
        id: 4,
        name: 'Resource D',
        color: '#e25dd2',
      },
      {
        id: 5,
        name: 'Resource E',
        color: '#1dab2f',
      },
      {
        id: 6,
        name: 'Resource F',
        color: '#d6d145',
      },
      {
        id: 7,
        name: 'Resource G',
        color: '#34c8e0',
      },
      {
        id: 8,
        name: 'Resource H',
        color: '#9dde46',
      },
      {
        id: 9,
        name: 'Resource I',
        color: '#166f6f',
      },
      {
        id: 10,
        name: 'Resource J',
        color: '#f7961e',
      },
      {
        id: 11,
        name: 'Resource K',
        color: '#34c8e0',
      },
      {
        id: 12,
        name: 'Resource L',
        color: '#af0000',
      },
      {
        id: 13,
        name: 'Resource M',
        color: '#446f1c',
      },
      {
        id: 14,
        name: 'Resource N',
        color: '#073138',
      },
      {
        id: 15,
        name: 'Resource O',
        color: '#4caf00',
      },
    ],
    [],
  );
  const defaultAppointments = []
  const [appointments, setAppointments] = useState(defaultAppointments);
  const [isOpen, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [info, setInfo] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [reason, setReason] = useState('');
  const [location, setLocation] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonType, setButtonType] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [infoRoom, setInfoRoom] = useState('');
  
  const timerRef = useRef(null);

  const inputRef = useRef(null)  

  const datePickerRef = useRef()
  const handleEventHoverIn = useCallback((args) => {
    const event = args.event;
    const time = formatDate('hh:mm A', new Date(event.start)) + ' - ' + formatDate('hh:mm A', new Date(event.end));

    setCurrentEvent(event);

    if (event.confirmed) {
      setStatus('Confirmed');
      setButtonText('Cancel appointment');
      setButtonType('warning');
    } else {
      setStatus('Canceled');
      setButtonText('Confirm appointment');
      setButtonType('success');
    }

    setBgColor(event.color);
    setInfo(event.title + ', Age: ' + event.age);
    setTime(time);
    setReason(event.reason);
    setLocation(event.location);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setAnchor(args.domEvent.target);
    setOpen(true);
  }, []);

  const handleEventHoverOut = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  const handleEventClick = useCallback(() => {
    setOpen(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);
  document.querySelectorAll(".mbsc-timeline-resource-title").forEach(item=>{
    item.addEventListener('click',(e)=>{
      e.stopPropagation();
      e.preventDefault();
      datePickerRef.current.openCalendar()
      setInfoRoom(e.target.innerText)
    })
 
  })
  const setStatusButton = useCallback(() => {
    setOpen(false);
    const index = appointments.findIndex((item) => item.id === currentEvent.id);
    const newApp = [...appointments];
    newApp[index].confirmed = !appointments[index].confirmed;
    setAppointments(newApp);
    // setToastMessage('Appointment ' + (currentEvent.confirmed ? 'confirmed' : 'canceled'));
    setToastOpen(true);
  }, [appointments, currentEvent]);

  const viewFile = useCallback(() => {
    setOpen(false);
    // setToastMessage('View file');
    setToastOpen(true);
  }, []);
  const[withCol,setWithCol]=useState(7);
  const deleteApp = useCallback(() => {
    setAppointments(appointments.filter((item) => item.id !== currentEvent.id));
    setOpen(false);
    // setToastMessage('Appointment deleted');
    setToastOpen(true);
  }, [appointments, currentEvent]);

  return (
    
    <div onClick={(e)=>{
      
      // inputRef.current.querySelectorAll('.mbsc-timeline-day').forEach(item=>{
      //   // console.log(inputRef.current)
      //   console.log(item.children.forEach(item2=>{
      //     console.log(item2)
      //   }))
      //   //item.style.width=item.style.width/1.2

      // })
      // inputRef.current.querySelectorAll('.mbsc-timeline-column').forEach(item=>{
      //   //item.style.width=item.style.width/1.2
      // })
      // inputRef.current.querySelectorAll('.mbsc-timeline-events').forEach(item=>{
      //   //item.style.width=item.style.width/1.2
      //   //item.style.right=item.style.right/1.2
      // })
   
      setWithCol(withCol-1);
      // inputRef.current.querySelector('.mbsc-timeline').style.width= '100vw';
    }}
    ref={inputRef}>
      <DatePicker

  calendar={persian}
  locale={persian_fa}
  calendarPosition="top-right"
  numberOfMonths={2}
  className="rmdp-mobile"
  multiple
  range
  ref={datePickerRef} 
  style={{display:'none'}}

>
    <div >
      <div className="md-tooltip-title">
           <span className="md-tooltip-reason md-tooltip-text">شماره اتاق:{infoRoom}</span>
        </div>
        
            <div >امکانات</div>
          <div style={{display:'flex',justifyContent:'end',width:'90%'}}>
           <div  style={{float:'left',marginTop:10,left:0}}> 3 <img src={require("./bedroom.png")} width={'20%'} style={{width:'20%'}} /></div>

           <div style={{float:'right'}}> دارد <img src={require("./toalet.png")} width={'25%'} style={{width:'25%'}} /></div>
           </div>
           </div>
           
          
        
</DatePicker>
    <Eventcalendar
      // clickToCreate={true}
      dragToCreate={true}
      dragToMove={true}
      dragToResize={true}
      onCellClick={(args,inst)=>{
        console.log(args)
      }}
    
      // eventDelete={true}
      rtl={true}
          touchUi={"auto"}
      view={myView}
      actionableEvents={true}
      mousewheel={true}
      dragTimeStep={120}
    
      resources={myResources}
       
      // eventOrder={myEvents}
      onEventCreate={(args,inst)=>{
        args.event.start.setHours(14)
        args.event.start.setMinutes(0)
        args.event.end.setHours(12)
        args.event.end.setMinutes(0)

      }}
     
      onEventHoverIn={(args,inst)=>{
        // args.event.start.setHours(14)
        // args.event.start.setMinutes(0)
        // args.event.end.setHours(12)
        // args.event.end.setMinutes(0)
      }}
      onEventClick={(args,inst)=>{
        args.event.start.setHours(14)
        args.event.start.setMinutes(0)
        args.event.end.setHours(12)
        args.event.end.setMinutes(0)
        
      }}
      onEventDragEnter={(args,inst)=>{
        // args.event.start.setHours(14)
        // args.event.start.setMinutes(0)
        // args.event.end.setHours(12)
        // args.event.end.setMinutes(0)
      }}
      onEventDragStart={(args,inst)=>{
        // args.event.start.setHours(14)
        // args.event.start.setMinutes(0)
        // args.event.end.setHours(12)
        // args.event.end.setMinutes(0)
      }}
      
      data={myEvents}
   
  
  
  
      // showEventTooltip={false}
      // height={260}
      // onEventHoverIn={handleEventHoverIn}
      onEventHoverOut={handleEventHoverOut}
      
    
      onEventDoubleClick={  handleEventHoverIn}
    />
    <Popup
    display="anchored"
    isOpen={isOpen}
    anchor={anchor}
    touchUi={false}
    showOverlay={false}
    contentPadding={false}
    closeOnOverlayClick={false}
    
    width={350}
    cssClass="md-tooltip"
  >
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="md-tooltip-header" style={{ backgroundColor: bgColor }}>
        <span className="md-tooltip-name-age">{info}</span>
        <span className="md-tooltip-time">{time}</span>
      </div>
      <div className="md-tooltip-info">
        <div className="md-tooltip-title">
          Status: <span className="md-tooltip-status md-tooltip-text">{status}</span>
          <Button color={buttonType} variant="outline" className="md-tooltip-status-button" onClick={setStatusButton}>
            {buttonText}
          </Button>
        </div>
        <div className="md-tooltip-title">
          Reason for visit: <span className="md-tooltip-reason md-tooltip-text">{reason}</span>
        </div>
        <div className="md-tooltip-title">
          Location: <span className="md-tooltip-location md-tooltip-text">{location}</span>
        </div>
        <Button color="secondary" className="md-tooltip-view-button" onClick={viewFile}>
          View patient file
        </Button>
        <Button color="danger" variant="outline" className="md-tooltip-delete-button" onClick={deleteApp}>
          Delete appointment
        </Button>
      </div>
    </div>
  </Popup>
  </div>

  );
}

export default App;