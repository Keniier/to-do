<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Auth;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();
        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tag' => 'required|in:incomplete,in_progress,complete',
            'due_date' => 'nullable|date',
            'image' => 'nullable|image',
        ]);

        // Procesar la imagen si existe
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tasks', 'public');
            $validatedData['image'] = $path;
        }

        $validatedData['user_id'] = Auth::id();

        $task = Task::create($validatedData);

        return response()->json($task, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tag' => 'required|in:incomplete,in_progress,complete',
            'due_date' => 'nullable|date',
            'image' => 'nullable|image',
        ]);

        // Procesar la imagen si existe
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tasks', 'public');
            $validatedData['image'] = $path;
        }

        $task->update($validatedData);

        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente.']);
    }
}
