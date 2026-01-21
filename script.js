
        const modeData = {
            all: {
                wins: 342,
                kills: 8547,
                kd: 3.24,
                winRate: '18.5%'
            },
            solo: {
                wins: 127,
                kills: 3214,
                kd: 3.87,
                winRate: '21.3%'
            },
            duos: {
                wins: 98,
                kills: 2456,
                kd: 3.12,
                winRate: '19.8%'
            },
            squads: {
                wins: 87,
                kills: 2134,
                kd: 2.89,
                winRate: '16.2%'
            },
            arena: {
                wins: 30,
                kills: 743,
                kd: 3.45,
                winRate: '15.7%'
            }
        };

        // Recent matches data
        const recentMatches = [
            { mode: 'Solo', result: 'Victory Royale', placement: '1st', kills: 12, isWin: true },
            { mode: 'Duos', result: '3rd Place', placement: '3rd', kills: 8, isWin: false },
            { mode: 'Squads', result: 'Victory Royale', placement: '1st', kills: 15, isWin: true },
            { mode: 'Solo', result: '7th Place', placement: '7th', kills: 6, isWin: false },
            { mode: 'Arena', result: 'Victory Royale', placement: '1st', kills: 11, isWin: true },
            { mode: 'Duos', result: '2nd Place', placement: '2nd', kills: 9, isWin: false },
            { mode: 'Squads', result: '5th Place', placement: '5th', kills: 7, isWin: false },
            { mode: 'Solo', result: 'Victory Royale', placement: '1st', kills: 14, isWin: true }
        ];

        let currentMode = 'all';

        // Initialize charts
        let performanceChart, winsByModeChart;

        function initCharts() {
            // Performance Trend Chart
            const perfCtx = document.getElementById('performanceChart').getContext('2d');
            performanceChart = new Chart(perfCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Wins',
                        data: [32, 45, 38, 52, 48, 61, 66],
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'K/D Ratio',
                        data: [2.8, 3.1, 2.9, 3.3, 3.4, 3.2, 3.5],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#fff'
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: '#fff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#fff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });

            // Wins by Mode Chart
            const winsCtx = document.getElementById('winsByModeChart').getContext('2d');
            winsByModeChart = new Chart(winsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Solo', 'Duos', 'Squads', 'Arena'],
                    datasets: [{
                        data: [127, 98, 87, 30],
                        backgroundColor: [
                            '#ec4899',
                            '#8b5cf6',
                            '#6366f1',
                            '#3b82f6'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#fff',
                                padding: 15
                            }
                        }
                    }
                }
            });
        }

        // Populate recent matches
        function populateMatches() {
            const container = document.getElementById('matches-container');
            container.innerHTML = recentMatches.map(match => `
                <div class="match-item">
                    <div class="match-info">
                        <div class="match-mode">${match.mode}</div>
                        <div class="match-result">${match.result}</div>
                    </div>
                    <div class="match-stats">
                        <div class="match-stat">
                            <span class="match-stat-label">Place</span>
                            <span class="match-stat-value">${match.placement}</span>
                        </div>
                        <div class="match-stat">
                            <span class="match-stat-label">Kills</span>
                            <span class="match-stat-value">${match.kills}</span>
                        </div>
                        <div>
                            <span class="${match.isWin ? 'win-badge' : 'loss-badge'}">
                                ${match.isWin ? 'WIN' : 'LOSS'}
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Switch game mode
        function switchMode(mode) {
            currentMode = mode;
            
            // Update active button
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // Update stats
            const data = modeData[mode];
            document.getElementById('total-wins').textContent = data.wins;
            document.getElementById('total-kills').textContent = data.kills.toLocaleString();
            document.getElementById('kd-ratio').textContent = data.kd;
            document.getElementById('win-rate').textContent = data.winRate;
        }

        // Modal functions
        function openSettings() {
            document.getElementById('settingsModal').classList.add('active');
        }

        function closeSettings() {
            document.getElementById('settingsModal').classList.remove('active');
        }

        function openProfile() {
            document.getElementById('profileModal').classList.add('active');
        }

        function closeProfile() {
            document.getElementById('profileModal').classList.remove('active');
        }

        function toggleSetting(element) {
            element.classList.toggle('active');
        }

        // Close modals when clicking outside
        window.onclick = function(event) {
            const settingsModal = document.getElementById('settingsModal');
            const profileModal = document.getElementById('profileModal');
            
            if (event.target === settingsModal) {
                closeSettings();
            }
            if (event.target === profileModal) {
                closeProfile();
            }
        }

        // Initialize on page load
        window.onload = function() {
            initCharts();
            populateMatches();
        }