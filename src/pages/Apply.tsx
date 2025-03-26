
// Fix the onClick handler for the Detailed Application button
<Button 
  onClick={() => user ? navigate("/apply/form") : setShowSignup(true)} 
  variant="outline" 
  className="w-full"
>
  Full Application Form
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
